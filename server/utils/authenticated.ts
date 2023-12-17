import type { EventHandler } from "h3";
import { ROLE } from "../types";
import { User } from "..//models/User";
import { SiweMessage } from "siwe";
import { UserType } from "../types/User";

export const authenticated = (
  handler: EventHandler,
  role: string = ROLE.USER
) =>
  defineEventHandler(async (event: any) => {
    try {
      const { signature, message, address, nonce } = event.node.req.headers;

      const siweMessage = new SiweMessage(JSON.parse(message));
      const verificationResult = await siweMessage.verify({ signature });
      const fields = verificationResult.data;

      if (fields.nonce !== nonce) {
        event.node.res.statusCode = 401;
        return {
          code: "AuthorizationFailed",
          message: "Invalid nonce.",
        };
      }

      if (fields.address !== address) {
        event.node.res.statusCode = 401;
        return {
          code: "AuthorizationFailed",
          message: "Wrong address!",
        };
      }

      // check for request origin and domain
      if (fields.domain !== event.node.req.headers.host) {
        event.node.res.statusCode = 401;
        return {
          code: "AuthorizationFailed",
          message: "Wrong domain!",
        };
      }

      if (fields.uri !== event.node.req.headers.origin) {
        event.node.res.statusCode = 401;
        return {
          code: "AuthorizationFailed",
          message: "Wrong uri!",
        };
      }

      // verify wallet role
      let user = await User.findOne({ address: fields.address });

      //for non user role routes do not create new user
      if (role !== ROLE.USER && !user) {
        event.node.res.statusCode = 401;
        return {
          code: "Unauthorized",
          message: "Wallet does not had permission to access this API!",
        };
      }

      if (!user) {
        // for user role routes create new user if not found db
        console.log("creating new user");

        const userPayload: UserType = {
          address: fields.address,
          chainId: fields.chainId,
          role: ROLE.USER,
          registered_at: new Date(),
        };
        const newUser = await new User(userPayload).save();

        user = await User.findById(newUser.id);
      }

      // if user is not present in db, return unauthorized
      if (!user) {
        event.node.res.statusCode = 401;
        return {
          error: "Unauthorized access, wallet address not found",
        };
      }

      if (
        user &&
        user.address?.toLowerCase() !== fields?.address?.toLowerCase()
      ) {
        event.node.res.statusCode = 401;
        return {
          code: "AuthorizationFailed",
          message: "Wrong address!",
        };
      }

      // role checks
      // skip access check if role is USER

      if (role !== ROLE.USER && user?.role !== role) {
        event.node.res.statusCode = 401;
        return {
          error: `Unauthorized access, ${role} role required`,
        };
      }

      event.context.auth = {
        user: { id: user._id, address: user.address, role: user.role },
      };

      const response = await handler(event);

      return { response };
    } catch (err: any) {
      console.log("wallet verification error ", err);
      event.node.res.statusCode = 500;
      return {
        code: "ERROR",
        message: "Authorization failed! Pleasee try again.",
      };
    }
  });

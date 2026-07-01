import { isValidEmail } from "../../services/helper";
import { Subscriber } from "../../models/Subscriber";

export default defineEventHandler(async (event: any) => {
  try {
    const config = useRuntimeConfig();
    const { email } = await (event.node?.req?.body || readBody(event));

    if (!isValidEmail(email)) {
      event.node.res.statusCode = 400;
      return {
        code: "INVALID_ID",
        message: "Invalid email address!",
      };
    }

    if (config.public.showcaseMode) {
      event.node.res.statusCode = 201;
      return {
        code: "OK",
        message: "Demo newsletter signup saved for showcase review.",
        success: true,
      };
    }

    const existingSubscriber = await Subscriber.findOne({
      email: email,
    });

    if (existingSubscriber?.id) {
      event.node.res.statusCode = 400;
      return {
        code: "INVALID_REQ",
        message: "Already subscribed",
      };
    }

    await new Subscriber({ email: email }).save();

    event.node.res.statusCode = 201;
    return {
      code: "OK",
      message: "Subscription success!",
    };
  } catch (err: any) {
    console.log("subscription error ", err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Failed to subscribe for newsletter",
    };
  }
});

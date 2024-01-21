import {
  emailMarkup,
  isValidTelegramUrl,
  isValidEmail,
} from "~/server/services/helper";
import { Referral } from "~/server/models/Referral";
import { sendEmail } from "~/server/services/email";

export default defineEventHandler(async (event: any) => {
  const config = useRuntimeConfig();

  try {
    const { name, email, telegram, level, message } = await (event.node?.req
      ?.body || readBody(event));

    if (!name) {
      event.node.res.statusCode = 401;
      return {
        code: "ERROR",
        message: "Invalid name!",
      };
    }

    // verify valid email with regex
    if (!isValidEmail(email)) {
      event.node.res.statusCode = 401;
      return {
        code: "ERROR",
        message: "Invalid email!",
      };
    }

    // verify telergam profile link with regex
    if (!isValidTelegramUrl(telegram)) {
      event.node.res.statusCode = 401;
      return {
        code: "ERROR",
        message: "Invalid telegram profile link!",
      };
    }

    // check level exists in defined levels
    if (!level) {
      event.node.res.statusCode = 401;
      return {
        code: "ERROR",
        message: "Invalid level",
      };
    }

    if (!message) {
      event.node.res.statusCode = 401;
      return {
        code: "ERROR",
        message: "Invalid message!",
      };
    }

    const alreadySent = await Referral.find({ email: email }).countDocuments();

    if (alreadySent > 0) {
      event.node.res.statusCode = 401;
      return {
        code: "ERROR",
        message: "Request already sent!",
      };
    }

    const heading = "Referral partner program";
    const payload = { heading, name, email, telegram, level, message };

    const emailPayload = {
      subject: heading,
      html: emailMarkup(payload),
    };

    const result = await sendEmail(emailPayload);

    if (!result) {
      event.node.res.statusCode = 401;
      return {
        code: "ERROR",
        message: "Failed to send email! Please try again",
      };
    }

    await new Referral(payload).save();

    event.node.res.statusCode = 201;
    return { code: "OK", message: "Email sent", success: true };
  } catch (err: any) {
    console.log("send mail error ", err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Server error!",
    };
  }
});

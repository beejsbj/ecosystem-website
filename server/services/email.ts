import SibApiV3Sdk from "@getbrevo/brevo";
const config = useRuntimeConfig();

export const sendEmail = async (payload: any) => {
  let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  if (!config.brevoMailApi || !config.emailReceiver || !config.emailSender) {
    return null;
  }

  apiInstance.setApiKey(
    SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
    config.brevoMailApi?.toString()
  );

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.subject = payload?.subject;
  sendSmtpEmail.htmlContent = payload?.html;
  sendSmtpEmail.sender = {
    name: "API3 Ecosystem",
    email: config.emailSender?.toString(),
  };
  sendSmtpEmail.to = [
    { email: config.emailReceiver?.toString(), name: "API3 ecosystem" },
  ];

  sendSmtpEmail.params = {
    parameter: "",
    subject: payload?.subject,
  };

  const result = await apiInstance.sendTransacEmail(sendSmtpEmail);

  return result;
};

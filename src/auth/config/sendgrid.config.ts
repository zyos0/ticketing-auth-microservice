const {
  apiKey,
  emailSender,

} = process.env;

export const sendGridConfig = {
  apiKey: apiKey || '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',
  emailSender: emailSender || 'ticketingauth@auth.com',
};

export const emailTemplates = {
  CONFIRMATION_EMAIL: 'd-2974da17733a4b448617acd296340311',
  RESET_PASSWORD_EMAIL: 'd-23db317a20074b21b7f380672f7b0cc3',
};

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const surveyTemplate = require('./emailTemplates/surveyTemplate');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(
  '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'
);

const sendMail = async (survey) => {
  const { subject, recipients } = survey;
  const to = recipients.map(({ email }) => email);
  const text = 'text';
  const from = 'willxtong@gmail.com';
  const html = surveyTemplate(survey);
  const msg = { to, subject, html, from, text };
  await sgMail.send(msg);
};

module.exports = sendMail;

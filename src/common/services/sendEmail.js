const nodeMailer = require('nodemailer');
const htmlToText = require('html-to-text');
const { emailConfig } = require('../config');
const renderTemplate = require('./renderTemplate');

const transport = nodeMailer.createTransport(emailConfig.transporter);

const sendEmail = async ({ templatePath, context, html, ...options }) => {
  const message = { ...options };

  message.html = html || (await renderTemplate(templatePath, context));
  message.text = htmlToText.fromString(message.html);
  message.from = message.from || emailConfig.from;

  return transport.sendMail(message);
};

module.exports = sendEmail;

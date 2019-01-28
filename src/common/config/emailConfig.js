exports.from = 'React Todo App <support@react-todo-app.com>';

exports.transporter = {
  host: process.env.EMAIL_TRANSPORTER_HOST,
  port: process.env.EMAIL_TRANSPORTER_PORT,
  secure: process.env.EMAIL_TRANSPORTER_SECURE,
  auth: {
    user: process.env.EMAIL_TRANSPORTER_AUTH_USER,
    pass: process.env.EMAIL_TRANSPORTER_AUTH_PASSWORD,
  },
};

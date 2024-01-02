import nodemailer from 'nodemailer';

export default nodemailer.createTransport({
  service: process.env.SMTP_SERVICE,
  pool: true,
  maxConnections: 10,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

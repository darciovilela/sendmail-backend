import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

interface SendMailOptions {
  to: string;
  subject: string;
  message: string;
}
export const sendMail = async (options: SendMailOptions) => {
  const transportOptions = {
    host: process.env.SMTP_HOST as string,
    port: parseInt(process.env.SMTP_PORT as string),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER as string,
      pass: process.env.SMTP_PASS as string,
    },
  };
  const transporter = nodemailer.createTransport(transportOptions);

  const { to, subject, message } = options;

  const info = await transporter.sendMail({
    from: `${process.env.EMAIL_FROM_NAME}<${process.env.EMAIL_FROM}>`,
    to,
    subject,
    // message,
    html: message,
  });

  console.log(info);
};

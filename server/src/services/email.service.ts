import nodemailer from "nodemailer";
import config from "../config";

const nodemailerConfig = {
  host: config.mail.host,
  port: config.mail.port,
  secure: true,
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },
};

const sendEmail = async (to: string, subject: string, html: string) => {
  const transporter = nodemailer.createTransport(
    nodemailerConfig as nodemailer.TransportOptions
  );
  await transporter.sendMail({
    from: config.mail.user,
    to,
    subject,
    html,
  });
};

exports = {
  sendEmail,
};

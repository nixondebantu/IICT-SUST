import nodemailer from "nodemailer";
import config from "../config/index.js";

const nodemailerConfig = {
  host: config.mail.host,
  port: config.mail.port,
  secure: true,
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },
};

export const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport(nodemailerConfig);
  try {
    await transporter.sendMail({
      from: config.mail.user,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Send email error:", error);
    throw error;
  }
};

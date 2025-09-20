import nodemailer from "nodemailer";

export default function sendEmail({ to, subject, text }) {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  transport.sendMail({
    from: process.env.EMAIL,
    to,
    subject,
    text,
  });
}

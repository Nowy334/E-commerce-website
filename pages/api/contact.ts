import type { NextApiRequest, NextApiResponse } from "next";

const nodemailer = require("nodemailer");
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ success: false });
  }

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "katya.zamowienia@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true,
  });

  const clientMessage = `test`;

  const toMeMessage = `
  <div>Imię:${req.body.firstName}</div>
  <div>Imię:${req.body.email}</div>
  <div>Imię:${req.body.description}</div>`;

  const mailClient = {
    from: "katya.zamowienia@gmail.com",
    to: req.body.email,
    subject: `Potwierdzenie zamówienia`,
    html: clientMessage,
    attachments: [
      {
        filename: "logo.png",
        path: "public/assets/logo.png",
        cid: "unique@kreata.ee",
      },
    ],
  };

  const mailToMe = {
    from: "katya.zamowienia@gmail.com",
    to: "chrisfrompolish@gmail.com",
    subject: req.body.title,
    html: toMeMessage,
  };

  let info, secondInfo;
  res.status(200).json({ message: "success" });
  // try {
  //   info = await transporter.sendMail(mailClient);
  //   res.status(200).json({ message: "success" });
  //   console.log("Message sent: %s", info.messageId);
  // } catch (err) {
  //   res.status(400).json({ message: err });
  // }

  // try {
  //   secondInfo = await transporter.sendMail(mailToMe);
  //   console.log("Message sent: %s", secondInfo.messageId);
  // } catch (err) {
  //   console.log(err);
  // }
};

export default handler;

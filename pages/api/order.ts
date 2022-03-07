// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let nodemailer = require("nodemailer");
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "chrisfrompolish@gmail.com",
      pass: "kulka006",
    },
    secure: true,
  });

  const text = { ...req.body };

  const mailData = {
    from: "chrisfrompolish@gmail.com",
    to: "22krzysztofify89@gmail.com",
    subject: `Message From ${req.body.firstName}`,
    text: JSON.stringify(text),
  };

  let info = await transporter.sendMail(mailData);

  console.log("Message sent: %s", info.messageId);

  res.status(200).json({ name: "John Doe" });
}

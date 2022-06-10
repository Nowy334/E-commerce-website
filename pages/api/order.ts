// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import withProtect from "../../middleware/withProtect";
import connectDB from "../../middleware/dbConnect";
import Order from "../../models/Order";
import admin from "../../lib/firebase/firebase";
import fs from "fs";
import path from "path";
import Email from "helpers/email";

type Attachments = {
  filename: string;
  path: string;
  cid?: string;
};

var topic = "fcm";

const tempClient = fs.readFileSync("./public/views/email/index.html", "utf-8");
const tempTable = fs.readFileSync("./public/views/email/table.html", "utf-8");
const tempOur = fs.readFileSync(
  "./public/views/email/ourEmail/index.html",
  "utf-8"
);

const replaceTemplate = (
  temp: any,
  orderNumber: number,
  body: any,
  table: any
) => {
  let output = temp.replace(/{%ORDERNUMBER%}/g, orderNumber.toString());
  output = output.replace(/{%FIRSTNAME%}/g, body.form.firstName);
  output = output.replace(/{%LASTNAME%}/g, body.form.lastName);
  output = output.replace(/{%PHONENUMBER%}/g, body.form.phoneNumber.toString());
  output = output.replace(/{%EMAIL%}/g, body.form.email);
  output = output.replace(/{%COMMENTS%}/g, body.form.comments);
  output = output.replace(/{%SHIPMENTTYPE%}/g, body.shipment.type);
  output = output.replace(/{%SHIPMENTPRICE%}/g, body.shipment.price.toString());
  output = output.replace(
    /{%PRICE%}/g,
    (body.shipment.price + body.totalPrice).toString()
  );
  output = output.replace(/{%STREET%}/g, body.form.street);
  output = output.replace(/{%POSTCODE%}/g, body.form.postcode);
  output = output.replace(/{%CITY%}/g, body.form.city);
  output = output.replace(/{%TABLE%}/g, table);

  return output;
};

const replaceTemplateTable = (el: any) => {
  let output = tempTable.replace(/{%TITLE%}/g, el.title);
  output = output.replace(/{%FILENAME%}/g, el.photo.fileName);
  output = output.replace(/{%COLOR%}/g, el.color ? el.color[0] : el.title);
  output = output.replace(/{%QUANTITY%}/g, el.quantity.toString());
  output = output.replace(/{%PRICE%}/g, (el.price * el.quantity).toString());

  return output;
};

const bodyMessage = (cart: any) => {
  let arrayTitle: any[] = [];
  cart.map((el: any) => {
    arrayTitle.push(el.title);
  });

  return arrayTitle.join(", ");
};

const generateOrderNumber = () => {
  let x = new Date().valueOf();
  let digits = x.toString().split("");
  return parseInt(digits.slice(7).join(""));
};

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const orderNumber = generateOrderNumber();

  let mailAttachments: Attachments[] = [
    {
      filename: "logo.png",
      path: "public/assets/logo.png",
      cid: "unique@kreata.ee",
    },
  ];

  req.body.cart.forEach((el: any) => {
    mailAttachments.push({
      filename: el.photo.fileName,
      path: `https:${el.photo.url}`,
      cid: `unique@${el.photo.fileName}`,
    });
  });

  const table = req.body.cart
    .map((el: any) => replaceTemplateTable(el))
    .join("");

  const clientMessage = replaceTemplate(
    tempClient,
    orderNumber,
    req.body,
    table
  );
  const toMeMessage = replaceTemplate(tempOur, orderNumber, req.body, table);

  const client = new Email(req.body.form.email, clientMessage, mailAttachments);
  const me = new Email(
    process.env.ME_EMAIL as string,
    toMeMessage,
    mailAttachments.slice(1)
  );

  let info, secondInfo;
  try {
    info = await client.send("Potwierdzenie zamówienia");
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    res.status(400).json({ message: err });
  }

  try {
    secondInfo = await me.send(`Nowe zamówienie ${orderNumber}`);
    console.log("Message sent: %s", secondInfo.messageId);
  } catch (err) {
    console.log(err);
  }

  return orderNumber;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(400).json({ success: false });
  }
  try {
    const orderNumber = await sendEmail(req, res);
    let order = new Order({
      orderNumber: orderNumber,
      name: req.body.form.firstName,
      lastName: req.body.form.lastName,
      street: req.body.form.street,
      postCode: req.body.form.postcode,
      city: req.body.form.city,
      phone: req.body.form.phoneNumber,
      email: req.body.form.email,
      comments: req.body.form.comments,
      order: req.body.cart.map((el: any) => {
        return {
          title: el.title,
          color: el.color ? el.color : undefined,
          quantity: el.quantity,
          price: el.price,
          photo: el.photo.url,
          size: el.size,
        };
      }),
      shipment: {
        kind: req.body.shipment.type,
        price: req.body.shipment.price,
      },
    });
    try {
      await order.save();
      admin
        .messaging()
        .send({
          notification: {
            title: "Nowe zamówienie",
            body: bodyMessage(req.body.cart),
          },
          topic: topic,
          apns: {
            payload: {
              aps: {
                orderNumber: orderNumber,
              },
            },
          },
        })
        .then((response) => {
          // Response is a message ID string.
          console.log("Successfully sent message:", response);
        })
        .catch((error) => {
          console.log("Error sending message:", error);
        });
      console.log("save");
    } catch (err) {
      res.status(400).json({ message: err });
      console.log(err);
    }
    res.status(200).json({ message: "success", orderNumber: orderNumber });
  } catch (err) {
    console.log(err);
  }
};

export default connectDB(handler);

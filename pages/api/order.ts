// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import withProtect from "../../middleware/withProtect";
import connectDB from "../../middleware/dbConnect";
import Order from "../../models/Order";
import admin from "../../lib/firebase/firebase";

var topic = "fcm";

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

const nodemailer = require("nodemailer");
const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: "katya.zamowienia@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
    secure: true,
  });

  const orderNumber = generateOrderNumber();

  const clientMessage = `
      <h1>Potwierdzenie złożenia zamówienia</h1>
      <p>Całkowita wartść, wraz z wysyłką ... </p>
      <p>Prosimy o dokonanie przelewu na ponizsze dane:</p>
      <p>
      Numer konta:  14 1140 2004 0000 3802 7796 9903
      </p>
      <p>W razie jakichkolwiek pytań lub wątpliwości prosimy o kontakt telefoniczny 577 044 090 lub emailowy katya.rgleotards@gmail.com</p>
      <div style="display: flex; align-items:center; justify-content:space-beetween;">
      <div>
      <div>Pozdrawiamy</div>
      <div>zespół Katya RG Leotards</div>
      </div>
      <img src="cid:unique@kreata.ee" width="114px" heigth="136px"/>
      </div>
      `;

  const toMeMessage = `
      <h1>Zamówienie </h1>
      <p>Zamówiono: </p>
      </br>
      <table>
      ${req.body.cart.map((el: any) => {
        return `<tr>
            <td>
            <p>${el.title}</p>
            <p>${el.color ? el.color[0] : el.title} </p>
            </td>
            <td>${el.quantity} szt</td>
            <td>${el.price * el.quantity} zł</td>
         </tr>
         </br>`;
      })}
      <tr>
      <td>Przesyłka:</td> <td>${req.body.shipment.type}</td><td> ${
    req.body.shipment.price
  }</td> </p>
      </tr>
      </table>
      <div>Suma: ${req.body.totalPrice + req.body.shipment.price}</div>
      </br>
      <div>Dane kupującego: </div>
      <p>Imie: ${req.body.form.firstName}</p>
      <p>Nazwisko:  ${req.body.form.lastName}</p>
      <p>Telefon: ${req.body.form.phoneNumber}</p>
      <p>Email: ${req.body.form.email}</p>
      <p>Kod pocztowy: ${req.body.form.postcode}</p>
      <p>Miasto: ${req.body.form.city}</p>
      <p>Ulica: ${req.body.form.street}</p>
      <p>uwagi: ${req.body.form.comments}</p>
      `;

  const mailClient = {
    from: "katya.zamowienia@gmail.com",
    to: req.body.form.email,
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
    subject: `Zamówienie od ${req.body.form.firstName} ${req.body.form.lastName}`,
    html: toMeMessage,
  };

  res.status(200).json({ message: "success", orderNumber: orderNumber });
  return orderNumber;

  let info, secondInfo;
  //   try {
  //     info = await transporter.sendMail(mailClient);
  //     res.status(200).json({ message: "success" });
  //     console.log("Message sent: %s", info.messageId);
  //   } catch (err) {
  //     res.status(400).json({ message: err });
  //   }

  //   try {
  //     secondInfo = await transporter.sendMail(mailToMe);
  //     console.log("Message sent: %s", secondInfo.messageId);
  //   } catch (err) {
  //     console.log(err);
  //   }
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
          photo: el.photo,
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
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
};

export default connectDB(handler);

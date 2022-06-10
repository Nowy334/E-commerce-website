import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import Email from "helpers/email";

const tempClient = fs.readFileSync(
  "./public/views/email/contact/clientContact.html",
  "utf-8"
);
const tempOur = fs.readFileSync(
  "./public/views/email/contact/ourContact.html",
  "utf-8"
);

const tempMeasureOur = fs.readFileSync(
  "./public/views/email/measures/index.html",
  "utf-8"
);

const tempMeasureClient = fs.readFileSync(
  "./public/views/email/measures/clientIndex.html",
  "utf-8"
);

const replaceTemplate = (el: any, temp: any, measures: boolean = false) => {
  let output = temp.replace(/{%DESCRIPTION%}/g, el.description);
  output = output.replace(/{%TITLE%}/g, el.title);
  output = output.replace(/{%FIRSTNAME%}/g, el.firstName);
  output = output.replace(/{%EMAIL%}/g, el.email);

  if (measures) {
    el.measures.forEach((el: any, i: number) => {
      output = output.replace(`{%data_${i + 1}%}`, el);
    });
  }

  return output;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST" || !req.body.code) {
    return res.status(400).json({ success: false });
  }

  let clientMessage;
  let client;
  let toMeMessage;
  let me;
  let title;

  if (req.body.code === "contact") {
    title = "kontakt";
    clientMessage = replaceTemplate(req.body, tempClient);
    client = new Email(req.body.email, clientMessage);

    toMeMessage = replaceTemplate(req.body, tempOur);
    me = new Email("chrisfrompolish@gmail.com", toMeMessage);
  } else if (req.body.code === "measures") {
    title = "wymiary";
    clientMessage = replaceTemplate(req.body, tempMeasureClient, true);
    client = new Email(req.body.email, clientMessage);

    toMeMessage = replaceTemplate(req.body, tempMeasureOur, true);
    me = new Email("chrisfrompolish@gmail.com", toMeMessage);
  }

  //let info, secondInfo;
  try {
    await client?.send(`katya-rg.eu / ${title}`);
    res.status(200).json({ message: "success" });
    //console.log("Message sent: %s", info.messageId);
  } catch (err) {
    res.status(400).json({ message: err });
  }

  try {
    await me?.send(`katya-rg.eu / ${title}`);
    //console.log("Message sent: %s", secondInfo.messageId);
  } catch (err) {
    console.log(err);
  }
};

export default handler;

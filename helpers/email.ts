const nodemailer = require("nodemailer");

class Email {
  from: string;
  to: string;
  template: string;
  attachments: any;

  constructor(to: string, template: string, attachments?: any) {
    this.from = "zamowienia@katya-rg.eu";
    this.to = to;
    this.template = template;
    this.attachments = attachments;
  }

  createTransport() {
    return nodemailer.createTransport({
      port: 465,
      host: "mail54.mydevil.net",
      auth: {
        user: "zamowienia@katya-rg.eu",
        pass: process.env.EMAIL_PASSWORD,
      },
      secure: true,
    });
  }

  async send(subject: string) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: this.template,
      attachments: this.attachments,
    };

    return await this.createTransport().sendMail(mailOptions);
  }
}

export default Email;

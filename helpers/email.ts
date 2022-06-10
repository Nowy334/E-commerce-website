const nodemailer = require("nodemailer");

class Email {
  from: string;
  to: string;
  template: string;
  attachments: any;

  constructor(to: string, template: string, attachments?: any) {
    this.from = process.env.ORDER_EMAIL as string;
    this.to = to;
    this.template = template;
    this.attachments = attachments;
  }

  createTransport() {
    return nodemailer.createTransport({
      port: 465,
      host: process.env.HOST,
      auth: {
        user: process.env.ORDER_EMAIL as string,
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

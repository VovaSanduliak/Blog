import dotenv from "dotenv";
import nodemailer, { Transporter } from "nodemailer";
dotenv.config();

class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      // host: process.env.SMTP_HOST,
      host: process.env.SMTP_HOST,
      // port: process.env.SMTP_PORT,
      // secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to: string, activationLink: string) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Activation account on ${process.env.API_URL}`,
      text: "",
      html: `
        <div>
          <h1>For activation, please follow the link</h1>
          <a href="${activationLink}">${activationLink}</a>
        </div>
      `,
    });
  }
}

export default new MailService();

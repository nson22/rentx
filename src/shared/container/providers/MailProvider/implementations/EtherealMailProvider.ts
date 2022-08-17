import { readFile } from "fs/promises";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";
import { injectable } from "tsyringe";

import { IMailProvider } from "../IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.createClient();
  }

  private async createClient(): Promise<void> {
    try {
      const account = await nodemailer.createTestAccount();

      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    } catch (err) {
      console.error(`EtherealMailProvider - Error:\n${err}`);
    }
  }

  async sendEmail(
    to: string,
    subject: string,
    params: string,
    filePath: string
  ): Promise<void> {
    if (!this.client) {
      await this.createClient();
    }

    const templateEmail = await readFile(filePath, "utf-8");

    const templateEmailParse = handlebars.compile(templateEmail);

    const templateEmailHTML = templateEmailParse(params);

    const message = await this.client.sendMail({
      to: "Rentx <rentx@rentx.com>",
      from: "Sender Name <sender@example.com>",
      subject: "Rentx password retrieve ✔",
      html: templateEmailHTML,
    });

    console.log("Message sent: %s", message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };

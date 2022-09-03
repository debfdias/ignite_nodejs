import { injectable } from "tsyringe";
import nodemailer, { Transporter} from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";

import { IMailProvider } from "../IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });

      this.client = transporter;
    }).catch(error => console.log(error));
  }

  async sendMail(to: string, subject: string, variables: any, path: string): Promise<void> {
    const template = fs.readFileSync(path).toString("utf-8");
    const templateParse = handlebars.compile(template);
    const templateHTML = templateParse(variables);

    const message = await this.client.sendMail({
      to,
      from: "rentx <noreplay@rentx.com",
      subject,
      html: templateHTML
    });

    console.log("message %s", message.messageId)
    console.log(nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider }
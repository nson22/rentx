import { IMailProvider } from "../IMailProvider";

class MailProviderInMemory implements IMailProvider {
  private email: any[] = [];

  async sendEmail(
    to: string,
    subject: string,
    params: any,
    filePath: string
  ): Promise<void> {
    this.email.push({
      to,
      subject,
      params,
      filePath,
    });
  }
}

export { MailProviderInMemory };

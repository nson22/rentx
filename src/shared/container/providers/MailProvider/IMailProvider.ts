interface IMailProvider {
  sendEmail(
    to: string,
    subject: string,
    params: any,
    filePath: string
  ): Promise<void>;
}

export { IMailProvider };

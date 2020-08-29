import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';

export default class FakeMailprovider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendMail({
    subject,
    templateData,
    to,
    from,
  }: ISendMailDTO): Promise<void> {
    this.messages.push({ subject, templateData, to, from });
  }
}

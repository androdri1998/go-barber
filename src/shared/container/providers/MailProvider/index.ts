import { container } from 'tsyringe';

import MailConfig from '@config/mail';
import IMailProvider from './models/IMailProvider';
import EtherealMailProvider from './implementations/EtherealMailProvider';

const providers = {
  ethereal: container.resolve(EtherealMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[MailConfig.driver],
);

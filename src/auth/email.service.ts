import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { sendGridConfig } from './config';

@Injectable()
export class EmailService {
  private readonly mailerInstance = sgMail;

  constructor() {
    this.mailerInstance.setApiKey(sendGridConfig.apiKey);
  }

  public async sendMail(templateId: string, to: string, data: { [key: string]: string }) {
    const msg = {
      to,
      templateId,
      dynamic_template_data: data,
      from: sendGridConfig.emailSender,
    };
    return await this.mailerInstance.send(msg);
  }
}

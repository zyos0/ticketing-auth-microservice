import { Document } from 'mongoose';

export interface CredentialInterface extends Document {
  scope: string[];
  email: string;
  password: string;
  resetToken: string;
  confirmed: true;
  resetTokenExpiration: Date;
  confirmationToken: string;
  confirmationExpiration: Date;
}

import * as mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);
export const CredentialSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  scope: [String],
  confirmed: { type: Boolean, default: false },
  resetToken: { type: String },
  resetTokenExpiration: { type: Date },
  confirmationToken: { type: String },
  confirmationExpiration: { type: Date },
});

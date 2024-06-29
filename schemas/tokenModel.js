import { Schema, model } from 'mongoose';
import handleSchemaValidationErrors from '../helpers/handleSchemaValidationErrors.js';

const TokenSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'UserModel' },
  token: { type: String, require: true },
});

TokenSchema.post('save', handleSchemaValidationErrors);

export const TokenModel = model('token', TokenSchema);

export default TokenSchema;

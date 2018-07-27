import { Schema, Document, model } from 'mongoose';
import { IClient } from '../interfaces/client.interface';
import { Response } from 'express';

const ClientSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  balance: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default model<IClient>('Client', ClientSchema);

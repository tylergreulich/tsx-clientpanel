import { Schema, Document, model } from 'mongoose';
import { IClient } from '../interfaces/client.interface';
import { Response } from 'express';

const ClientSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  balance: {
    type: String,
    trim: true,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default model<IClient>('Client', ClientSchema);

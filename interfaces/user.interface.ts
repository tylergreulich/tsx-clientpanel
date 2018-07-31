import { Document, Types } from 'mongoose';
import { Response } from 'express';
import { IPayload } from './payload.interface';
import { IClient } from './client.interface';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  generateAuthToken: (payload: IPayload, res: Response) => object;
  clients: Types.Array<IClient>;
}

import * as Validator from 'validator';
import { IClient } from '../interfaces/client.interface';
import { IClientErrors } from '../interfaces/clientErrors.interface';
import { isEmpty } from './is-empty';

export const validateClient = (data: IClient) => {
  let errors: IClientErrors = {};

  data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
  data.lastName = !isEmpty(data.lastName) ? data.lastName : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.balance = !isEmpty(data.balance) ? data.balance : '';

  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First Name is required';
  }

  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last Name is required';
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }

  if (Validator.isEmpty(data.balance)) {
    errors.balance = 'Balance is required';
  }

  return { errors, isValid: isEmpty(errors) };
};

import { RouteComponentProps } from 'react-router-dom';
import { History } from 'history';

export interface RegisterProps extends RouteComponentProps<any> {
  auth: {
    isAuthenticated: boolean;
  };
  history: History;
  registerUser: (userData: object, history: History) => void;
  error: boolean | undefined;
}

interface RegisterFields {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterFieldErrors {
  errors?: {
    [key: string]: RegisterFields;
  };
}

export type RegisterState = RegisterFields & RegisterFieldErrors;

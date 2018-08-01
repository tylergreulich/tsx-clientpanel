import { History } from 'history';
import { RouteComponentProps } from 'react-router-dom';

export interface LoginProps extends RouteComponentProps<any> {
  history: History;
  auth: {
    isAuthenticated: boolean;
  };
  loginUser: (userData: object, history: History) => void;
  error: boolean | undefined;
}

interface LoginFields {
  email: string;
  password: string;
}

interface LoginFieldErrors {
  errors?: {
    [key: string]: LoginFields;
  };
}

export type LoginState = LoginFields & LoginFieldErrors;

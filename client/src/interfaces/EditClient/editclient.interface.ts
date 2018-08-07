import { RouteComponentProps } from 'react-router-dom';

interface EditClientFields {
  firstName: string;
  lastName: string;
  email: string;
  balance: string;
  isData?: boolean;
}

interface EditClientFieldErrors {
  errors?: {
    [key: string]: EditClientFields;
  };
}

export interface EditClientProps extends RouteComponentProps<any> {
  editClient: (clientId: string, clientData: object, history: object) => void;
  getClient: (clientId: string) => void;
  client: {
    client: {
      _id: string;
      firstName: string;
      lastName: string;
      balance: string;
      email: string;
    };
    loading: boolean;
  };
  errors: {};
}

export type EditClientState = EditClientFields & EditClientFieldErrors;

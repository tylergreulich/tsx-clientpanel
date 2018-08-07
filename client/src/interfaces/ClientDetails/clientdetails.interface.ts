import { RouteComponentProps } from 'react-router-dom';

export interface ClientDetailsProps extends RouteComponentProps<any> {
  getClient: (id: string) => void;
  resetIsUpdated: () => void;
  client: {
    client: {
      _id: string;
      firstName: string;
      lastName: string;
      balance: string;
      email: string;
    };
    isUpdated: boolean;
  };
}

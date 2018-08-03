import { RouteComponentProps } from 'react-router-dom';
import { History } from 'history';

export interface ClientDetailsProps extends RouteComponentProps<any> {
  history: History;
  getClient: (id: string) => void;
  deleteClient: (id: string, history: History) => void;
  client: {
    client: {
      _id: string;
      firstName: string;
      lastName: string;
      balance: string;
      email: string;
    };
  };
}

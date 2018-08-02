export interface ClientsProps {
  getClients: (userId: string) => any;
  client: {
    clients: {
      clients: [
        {
          client: {
            _id: string;
            firstName: string;
            lastName: string;
            email: string;
            balance: string;
          };
        }
      ];
    };
  };
  auth: {
    user: {
      id: string;
    };
  };
}

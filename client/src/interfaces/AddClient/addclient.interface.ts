interface AddClientStateProps {
  open: boolean;
  showSpinner: boolean;
}

interface AddClientFields extends AddClientStateProps {
  firstName: string;
  lastName: string;
  email: string;
  balance: string;
}

interface AddClientFieldErrors {
  errors?: {
    [key: string]: AddClientFields;
  };
}

export interface AddClientProps {
  addClient: (clientData: object) => void;
  errors: {};
  client: {
    clients: {};
  };
}

export type AddClientState = AddClientFields & AddClientFieldErrors;

import * as React from 'react';
import { Modal, Button, TextField } from '@material-ui/core';
import ThemeWrapper from '../StyledComponents/MuiTheme/MuiTheme';
import { AddClientForm } from '../StyledComponents/Form/AddClientForm/AddClientForm';
import { connect } from 'react-redux';
import { addClient } from '../../store/actions/clientActions';

import NumberFormat from './NumberFormat/NumberFormat';

interface AddClientStateProps {
  open: boolean;
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

interface AddClientProps {
  addClient: (clientData: object) => void;
}

type AddClientState = AddClientFields & AddClientFieldErrors;

class AddClient extends React.Component<AddClientProps, AddClientState> {
  public state: AddClientState = {
    open: false,
    firstName: '',
    lastName: '',
    email: '',
    balance: '1320',
    errors: {}
  };

  public componentWillReceiveProps(nextProps: any) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  public onOpenHandler = () => this.setState({ open: true });

  public onCloseHandler = () => this.setState({ open: false });

  public changeBalanceHandler = (name: string) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ ...this.state, [name]: event.target.value });
  };

  public onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  public onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { firstName, lastName, email, balance } = this.state;

    const clientData = {
      firstName,
      lastName,
      email,
      balance
    };

    this.props.addClient(clientData);
  };

  public render() {
    const { open, balance, errors } = this.state;

    return (
      <>
        <Button onClick={this.onOpenHandler}>Open Modal</Button>
        <ThemeWrapper>
          <Modal open={open} onClose={this.onCloseHandler}>
            <AddClientForm onSubmit={this.onSubmitHandler}>
              <TextField
                label={errors!.firstName ? errors!.firstName : 'First Name'}
                onChange={this.onChangeHandler}
                error={!!errors!.firstName}
                name="firstName"
              />
              <TextField
                label={errors!.lastName ? errors!.lastName : 'Last Name'}
                onChange={this.onChangeHandler}
                error={!!errors!.lastName}
                name="lastName"
              />
              <TextField
                label={errors!.email ? errors!.email : 'Email'}
                onChange={this.onChangeHandler}
                error={!!errors!.email}
                name="email"
              />
              <TextField
                label={errors!.balance ? errors!.balance : 'Balance'}
                value={balance}
                onChange={this.changeBalanceHandler('balance')}
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormat
                }}
                error={!!errors!.email}
              />
              <Button
                variant="contained"
                color="primary"
                style={{ width: '12.5rem' }}
                type="submit"
              >
                CREATE
              </Button>
            </AddClientForm>
          </Modal>
        </ThemeWrapper>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  errors: state.errors,
  client: state.client,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addClient }
)(AddClient);

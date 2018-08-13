import * as React from 'react';
import { Modal, Button, TextField } from '@material-ui/core';
import ThemeWrapper from '../StyledComponents/MuiTheme/MuiTheme';
import { AddClientForm } from '../StyledComponents/Form/AddClientForm/AddClientForm';
import { FormButton } from '../StyledComponents/Buttons/Buttons';
import { connect } from 'react-redux';
import { addClient } from '../../store/actions/clientActions';

import NumberFormat from './NumberFormat/NumberFormat';

import {
  AddClientProps,
  AddClientState
} from '../../interfaces/AddClient/addclient.interface';

class AddClient extends React.Component<AddClientProps, AddClientState> {
  public state: AddClientState = {
    open: false,
    showSpinner: false,
    firstName: '',
    lastName: '',
    email: '',
    balance: '1320',
    errors: {}
  };

  public componentDidUpdate(prevState: any, prevProps: any) {
    if (prevState.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }

    if (prevProps) {
      console.log(prevProps);
    }

    // const {
    //   client: { clients }
    // } = prevProps;

    // if (clients !== undefined && clients.length !== 0) {
    //   if (
    //     clients.clients &&
    //     this.props.client.clients[0] &&
    //     clients.clients.length === this.props.client.clients[0].clients.length
    //   ) {
    //     this.setState({ open: false, showSpinner: false });
    //   }
    // }
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

    const clientData = { firstName, lastName, email, balance };

    this.props.addClient(clientData);

    this.setState({ showSpinner: true });
  };

  public render() {
    const { open, balance, errors, showSpinner } = this.state;

    let addClientModal: JSX.Element | null;

    if (open) {
      addClientModal = (
        <Modal open={open} onClose={this.onCloseHandler}>
          <AddClientForm onSubmit={this.onSubmitHandler}>
            {!showSpinner ? (
              <>
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
                  error={!!errors!.balance}
                />
                <FormButton
                  variant="contained"
                  color="primary"
                  wide={true}
                  uppercase={true}
                >
                  create
                </FormButton>
              </>
            ) : (
              <h1 onClick={() => console.log(this.props)}>Loading!!!!</h1>
            )}
          </AddClientForm>
        </Modal>
      );
    } else {
      addClientModal = null;
    }

    return (
      <>
        <Button onClick={this.onOpenHandler}>Add Client</Button>
        <ThemeWrapper>{addClientModal}</ThemeWrapper>
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

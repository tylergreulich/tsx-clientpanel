import * as React from 'react';
import { connect } from 'react-redux';
import { editClient, getClient } from '../../store/actions/clientActions';

import { Typography, TextField, Button } from '@material-ui/core';

import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';
import { FormContainer } from '../StyledComponents/Form/FormContainer';
import ThemeWrapper from '../StyledComponents/MuiTheme/MuiTheme';

import NumberFormat from '../AddClient/NumberFormat/NumberFormat';

import {
  EditClientState,
  EditClientProps
} from '../../interfaces/EditClient/editclient.interface';

class EditClient extends React.Component<EditClientProps, EditClientState> {
  public state: EditClientState = {
    firstName: '',
    lastName: '',
    email: '',
    balance: '',
    errors: {},
    isData: false
  };

  public componentDidMount() {
    this.props.getClient(this.props.match.params.id);
  }

  public componentDidUpdate(prevState: any) {
    if (prevState.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }

    if (!this.state.isData) {
      this.setState({ isData: true });

      setTimeout(() => {
        const {
          client: {
            client: { firstName, lastName, email, balance }
          }
        } = this.props;

        this.setState({
          firstName,
          lastName,
          email,
          balance
        });
      }, 75);
    }
  }

  public onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { firstName, lastName, email, balance } = this.state;

    const clientData = {
      firstName,
      lastName,
      email,
      balance
    };

    this.props.editClient(
      this.props.match.params.id,
      clientData,
      this.props.history
    );
  };

  public onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  public changeBalanceHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.setState({ balance: event.target.value });
  };

  public onFirstNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ firstName: event.currentTarget.value });
  };

  public render() {
    console.log(this.props);
    const { errors, firstName, balance } = this.state;
    const {
      client: {
        client: { lastName, email }
      }
    } = this.props;

    let renderedContent;

    if (this.props.client.loading) {
      renderedContent = <h1>Loading...</h1>;
    } else {
      renderedContent = (
        <ComponentWrapper>
          <FormContainer
            onSubmit={this.onSubmitHandler}
            key={this.props.client.client._id}
          >
            <Typography
              variant="display3"
              onClick={() => console.log(this.state)}
            >
              Edit Client
            </Typography>
            <ThemeWrapper>
              <TextField
                error={!!errors!.firstName}
                label={errors!.firstName ? errors!.firstName : 'First Name'}
                value={firstName}
                margin="normal"
                name="firstName"
                onChange={this.onFirstNameHandler}
              />
              <TextField
                error={!!errors!.lastName}
                label={errors!.lastName ? errors!.lastName : 'Last Name'}
                defaultValue={lastName}
                margin="normal"
                name="lastName"
                onChange={this.onChangeHandler}
              />
              <TextField
                error={!!errors!.email}
                label={errors!.email ? errors!.email : 'Email'}
                defaultValue={email}
                margin="normal"
                name="email"
                onChange={this.onChangeHandler}
              />
              <TextField
                label={errors!.balance ? errors!.balance : 'Balance'}
                value={balance}
                onChange={this.changeBalanceHandler}
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: NumberFormat
                }}
                error={!!errors!.balance}
              />
              <Button variant="contained" color="primary" type="submit">
                Submit
              </Button>
            </ThemeWrapper>
          </FormContainer>
        </ComponentWrapper>
      );
    }

    return <>{renderedContent}</>;
  }
}

const mapStateToProps = (state: any) => ({
  errors: state.errors,
  client: state.client
});

export default connect(
  mapStateToProps,
  { editClient, getClient }
)(EditClient);

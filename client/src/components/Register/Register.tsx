import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../store/actions/authActions';
import ThemeWrapper from '../StyledComponents/MuiTheme/MuiTheme';
import { TextField, Typography, Button } from '@material-ui/core';
import { FormContainer } from '../StyledComponents/Form/FormContainer';
import {
  RegisterState,
  RegisterProps
} from '../../interfaces/Register/register.interface';

import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';

class Register extends React.Component<RegisterProps, RegisterState> {
  public state: RegisterState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    errors: {}
  };

  public componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/feed');
    }
  }

  public componentDidUpdate(prevState: any) {
    if (prevState.errors !== this.props.errors) {
      this.setState({ errors: this.props.errors });
    }
  }

  public onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { username, email, password, confirmPassword } = this.state;

    const userData = {
      username,
      email,
      password,
      confirmPassword
    };

    this.props.registerUser(userData, this.props.history);
  };

  public onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  public render() {
    const { username, email, password, confirmPassword, errors } = this.state;

    return (
      <>
        <ComponentWrapper>
          <FormContainer onSubmit={this.onSubmitHandler}>
            <ThemeWrapper>
              <Typography variant="display3">ClientPanel</Typography>
              <TextField
                error={!!errors!.username}
                label={errors!.username ? errors!.username : 'Username'}
                value={username}
                margin="normal"
                name="username"
                onChange={this.onChangeHandler}
              />
              <TextField
                error={!!errors!.email}
                label={errors!.email ? errors!.email : 'Email'}
                value={email}
                margin="normal"
                name="email"
                onChange={this.onChangeHandler}
              />
              <TextField
                type="password"
                error={!!errors!.password}
                label={errors!.password ? errors!.password : 'Password'}
                value={password}
                margin="normal"
                name="password"
                onChange={this.onChangeHandler}
              />
              <TextField
                type="password"
                error={!!errors!.confirmPassword}
                label={
                  errors!.confirmPassword
                    ? errors!.confirmPassword
                    : 'Confirm Password'
                }
                value={confirmPassword}
                margin="normal"
                name="confirmPassword"
                onChange={this.onChangeHandler}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  width: '30rem'
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: '12.5rem' }}
                  type="submit"
                >
                  Sign Up
                </Button>
                <Link to="/login">
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ width: '12.5rem' }}
                  >
                    Or Login
                  </Button>
                </Link>
              </div>
            </ThemeWrapper>
          </FormContainer>
        </ComponentWrapper>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));

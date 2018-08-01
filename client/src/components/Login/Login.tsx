import * as React from 'react';

import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/authActions';

import { TextField, Typography, Button } from '@material-ui/core';

import ThemeWrapper from '../StyledComponents/MuiTheme/MuiTheme';
import { FormContainer } from '../StyledComponents/Form/FormContainer';

import { LoginState, LoginProps } from '../../interfaces/Login/login.interface';

import { ComponentWrapper } from '../StyledComponents/ComponentWrapper';

class Login extends React.Component<LoginProps, LoginState> {
  public state: LoginState = {
    email: '',
    password: '',
    errors: {}
  };

  public componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/feed');
    }
  }

  public componentWillReceiveProps(nextProps: any) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/feed');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  public onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData, this.props.history);
  };

  public onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  public render() {
    const { email, password, errors } = this.state;

    return (
      <ComponentWrapper>
        <FormContainer onSubmit={this.onSubmitHandler}>
          <Typography variant="display3">Login</Typography>
          <ThemeWrapper>
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
            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>
            <Link to="/register">
              <Button variant="contained" color="primary" type="submit">
                Or Signup
              </Button>
            </Link>
          </ThemeWrapper>
        </FormContainer>
      </ComponentWrapper>
    );
  }
}

const mapStateToProps = (state: any) => ({
  errors: state.errors,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));

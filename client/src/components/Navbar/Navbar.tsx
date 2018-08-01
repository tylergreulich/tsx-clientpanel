import * as React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import ThemeProvider from '../StyledComponents/MuiTheme/MuiTheme';

import {
  RegisterLink,
  LoginLink,
  DashboardLink,
  LogoutLink
} from '../StyledComponents/Navbar/Navbar';

import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/authActions';

interface NavBarProps {
  auth: {
    isAuthenticated: boolean;
  };
  history: {
    push: (route: string) => void;
  };
  logoutUser: () => void;
}

const navBar = (props: NavBarProps) => {
  const onLogoutHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    props.logoutUser();
    props.history.push('/login');
  };

  let authButtons;

  if (props.auth.isAuthenticated) {
    authButtons = (
      <LogoutLink to="/login">
        <Button color="inherit" onClick={onLogoutHandler}>
          Logout
        </Button>
      </LogoutLink>
    );
  } else {
    authButtons = (
      <>
        <RegisterLink to="/register">
          <Button color="inherit">Register</Button>
        </RegisterLink>
        <LoginLink to="/login">
          <Button color="inherit">Login</Button>
        </LoginLink>
      </>
    );
  }

  return (
    <div style={{ flexGrow: 1 }}>
      <ThemeProvider>
        <AppBar position="static">
          <Toolbar style={{ width: '900px', margin: '0 auto' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '3.6rem',
                flex: 0.25
              }}
            >
              <Typography
                variant="title"
                color="inherit"
                style={{ fontSize: '1.3rem !important' }}
              >
                ClientPanel
              </Typography>
              <DashboardLink to="/">
                <Button color="inherit" style={{ fontSize: '1.2rem' }}>
                  Dashboard
                </Button>
              </DashboardLink>
            </div>
            <div
              style={{
                display: 'flex',
                flex: 0.75,
                justifyContent: 'flex-end'
              }}
            >
              {authButtons}
            </div>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(navBar);

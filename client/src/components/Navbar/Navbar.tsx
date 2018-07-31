import * as React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

import { Link } from 'react-router-dom';

const navBar = (props: {}) => {
  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar style={{ width: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', flex: 0.25 }}>
            <Typography variant="title" color="inherit">
              ClientPanel
            </Typography>
            <Link
              to="/"
              style={{
                textDecoration: 'none',
                color: 'inherit',
                flex: 1
              }}
            >
              <Typography
                variant="subheading"
                color="inherit"
                style={{ flexGrow: 1, textAlign: 'center', marginLeft: '1rem' }}
              >
                Dashboard
              </Typography>
            </Link>
          </div>
          <div
            style={{ display: 'flex', flex: 0.75, justifyContent: 'flex-end' }}
          >
            <Link
              to="/register"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Button color="inherit">Register</Button>
            </Link>
            <Link
              to="/login"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <Button color="inherit">Login</Button>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default navBar;

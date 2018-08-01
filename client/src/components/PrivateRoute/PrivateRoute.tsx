import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  exact,
  path,
  component: Component,
  auth,
  ...rest
}: any) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mapStateToProps = (state: any) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);

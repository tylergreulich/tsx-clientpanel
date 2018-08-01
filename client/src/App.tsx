import * as React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import PageNotFound from './components/PageNotFound/PageNotFound';

import { Provider } from 'react-redux';
import store from './store/store';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
import * as jwt_decode from 'jwt-decode';
import setAuthToken from './utilities/setAuthToken';
import { setCurrentUser, logoutUser } from './store/actions/authActions';

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded: { exp: number } = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

export default class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Navbar />
            <Switch>
              <Route exact={true} path="/" component={Dashboard} />
              <Route exact={true} path="/register" component={Register} />
              <Route exact={true} path="/login" component={Login} />
              <Route
                exact={true}
                path="/page-not-found"
                component={PageNotFound}
              />
              <Route
                exact={true}
                path="*"
                render={() => <Redirect to="/page-not-found" />}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

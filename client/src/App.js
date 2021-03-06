import * as React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import PageNotFound from './components/PageNotFound/PageNotFound';
import AddClient from './components/AddClient/AddClient';
import ClientDetails from './components/ClientDetails/ClientDetails';
import EditClient from './components/EditClient/EditClient';

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
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div>
            <Navbar />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add-client" component={AddClient} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/client/:id"
                component={ClientDetails}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/edit-client/:id"
                component={EditClient}
              />
            </Switch>
            <Route exact path="/page-not-found" component={PageNotFound} />
            {/* <Route
              exact
              path="/"
              render={() => <Redirect to="/page-not-found" />}
            /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

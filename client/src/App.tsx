import * as React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import PageNotFound from './components/PageNotFound/PageNotFound';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class App extends React.Component {
  public render() {
    return (
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
    );
  }
}

export default App;

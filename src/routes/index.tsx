import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Payment from '../pages/Payment';
import Settings from '../pages/Settings';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/signup" exact component={SignUp} />

    <Route path="/dashboard" exact component={Dashboard} isPrivate />
    <Route path="/payment" exact component={Payment} isPrivate />
    <Route path="/settings" exact component={Settings} isPrivate />
  </Switch>
);

export default Routes;

import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import SignUp from '../pages/SignUp';
import Store from '../pages/Store';
import SubCategories from '../pages/SubCategories';
import Items from '../pages/Items';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/SignUp" exact component={SignUp} />
    <Route path="/store/:cpf" exact component={Store} />
    <Route path="/subcategories" exact component={SubCategories} />
    <Route path="/items" exact component={Items} />
  </Switch>
);

export default Routes;

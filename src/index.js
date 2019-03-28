import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

import Menu from './Menu';

import Home from './Home';

import BestillingList from './Bestilling';

import PersonList from './Person';
import PersonEdit from './PersonEdit';
import PersonAdd from './PersonAdd';

import SykkelList from './Sykkel';
import SykkelEdit from './SykkelEdit';
import SykkelAdd from './SykkelAdd';

import BestillingsInfo from './BestillingsInfo';
import BestillingEdit from './BestillingEdit';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/bestillinger" component={BestillingList} />
      <Route exact path="/persons" component={PersonList} />
      <Route path="/persons/:person_id/edit" component={PersonEdit} />
      <Route path="/persons/add" component={PersonAdd} />
      <Route exact path="/sykler" component={SykkelList} />
      <Route path="/sykler/:sykkel_id/edit" component={SykkelEdit} />
      <Route path="/sykler/add" component={SykkelAdd} />
      <Route exact path="/bestillingsinfoer" component={BestillingsInfo} />
      <Route exact path="/bestillingsinfoer/:person_id/edit" component={BestillingEdit} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);

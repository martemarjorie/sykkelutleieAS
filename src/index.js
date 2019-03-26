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

import SykkelList from './Sykkel';

import BestillingsOversikt from './BestillingOversikt';

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
      <Route exact path="/sykler" component={SykkelList} />
      <Route exact path="/oversikt" component={BestillingsOversikt} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);

import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';

import Menu from './Menu';

import Home from './Home';

import NyBestilling from './Nybestilling';

import PersonList from './Person';
import PersonEdit from './PersonEdit';
import PersonAdd from './PersonAdd';

import SykkelList from './Sykkel';
import SykkelEdit from './SykkelEdit';
import SykkelAdd from './SykkelAdd';

import UtstyrList from './Utstyr';
import UtstyrEdit from './UtstyrEdit';
import UtstyrAdd from './UtstyrAdd';

import BestillingsList from './BestillingsInfo';

import FraktList from './Frakt';
import FraktEdit from './FraktEdit';
import FraktAdd from './FraktAdd';

import RepList from './Reparasjon';
import RepEdit from './RepEdit';
import RepAdd from './RepAdd';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory();

/* legger inn route for å navigere gjennom sidene i menybaren */
ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/nybestilling" component={NyBestilling} />

      <Route exact path="/persons" component={PersonList} />
      <Route path="/persons/:person_id/edit" component={PersonEdit} />
      <Route path="/persons/add" component={PersonAdd} />

      <Route exact path="/sykler" component={SykkelList} />
      <Route path="/sykler/:sykkel_id/edit" component={SykkelEdit} />
      <Route path="/sykler/add" component={SykkelAdd} />

      <Route exact path="/utstyrer" component={UtstyrList} />
      <Route path="/utstyrer/:utstyr_id/edit" component={UtstyrEdit} />
      <Route path="/utstyrer/add" component={UtstyrAdd} />

      <Route exact path="/bestillinger" component={BestillingsList} />

      <Route exact path="/frakter" component={FraktList} />
      <Route path="/frakter/:frakt_id/edit" component={FraktEdit} />
      <Route path="/frakter/add" component={FraktAdd} />

      <Route exact path="/reps" component={RepList} />
      <Route path="/reps/:reparasjons_id/edit" component={RepEdit} />
      <Route path="/reps/add" component={RepAdd} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);

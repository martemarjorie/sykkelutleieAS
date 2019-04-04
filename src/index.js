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
import BestillingerEdit from './BestillingEdit';

import FraktList from './Frakt';
import FraktEdit from './FraktEdit';

import RepList from './reperasjon';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

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
      <Route path="/bestillinger/:bestilling_id/edit" component={BestillingerEdit} />
      <Route exact path="/transport" component={TransportList} />
      <Route exact path="/reperasjon" component={RepList} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);

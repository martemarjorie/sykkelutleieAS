import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
<<<<<<< HEAD
import { personService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <div>
        <NavLink to="/persons">Personer</NavLink>
      </div>
    );
  }
}

class PersonList extends Component {
  persons = [];

  render() {
    return (
      <Card title="Personer">
        {this.persons.map(person => (
          <Row>
            <Column key={person.person_id}>
              <NavLink to={'/persons/' + person.person_id + '/edit'}>{person.fornavn}</NavLink>
            </Column>
            <Column width={6}>test</Column>
          </Row>
        ))}
      </Card>
    );
  }

  mounted() {
    personService.getPersons(persons => {
      this.persons = persons;
    });
  }
}

class PersonEdit extends Component {
  fornavn = '';
  etternavn = '';
  tlf = '';
  epost = '';

  render() {
    return (
      <form>
        Fornavn: <input type="text" value={this.fornavn} onChange={event => (this.fornavn = event.target.value)} />
        Etternavn:{' '}
        <input type="text" value={this.etternavn} onChange={event => (this.etternavn = event.target.value)} />
        Tlf: <input type="number" value={this.tlf} onChange={event => (this.tlf = event.target.value)} />
        Epost: <input type="text" value={this.epost} onChange={event => (this.epost = event.target.value)} />
        <button type="button" onClick={this.save}>
          Save
        </button>
      </form>
    );
  }

  mounted() {
    personService.getPerson(this.props.match.params.person_id, person => {
      this.fornavn = person.fornavn;
      this.etternavn = person.etternavn;
      this.tlf = person.tlf;
      this.epost = person.epost;
    });
  }

  save() {
    personService.updatePerson(
      this.props.match.params.person_id,
      this.fornavn,
      this.etternavn,
      this.tlf,
      this.epost,
      () => {
        history.push('/persons');
      }
    );
  }
}
=======

import Menu from './Menu';

import Home from './Home';

import BestillingList from './Bestilling';

import PersonList from './Person';
import PersonEdit from './PersonEdit';

import SykkelList from './Sykkel';

import BestillingsOversikt from './BestillingOversikt';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student
>>>>>>> parent of de118d8... Revert "Merge branch 'master' of https://github.com/martemarjorie/sykkelutleieAS"

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
<<<<<<< HEAD
      <Route exact path="/persons" component={PersonList} />
      <Route path="/persons/:person_id/edit" component={PersonEdit} />
=======
      <Route exact path="/" component={Home} />
      <Route exact path="/bestillinger" component={BestillingList} />
      <Route exact path="/persons" component={PersonList} />
      <Route path="/persons/:person_id/edit" component={PersonEdit} />
      <Route exact path="/sykler" component={SykkelList} />
      <Route exact path="/oversikt" component={BestillingsOversikt} />
>>>>>>> parent of de118d8... Revert "Merge branch 'master' of https://github.com/martemarjorie/sykkelutleieAS"
    </div>
  </HashRouter>,
  document.getElementById('root')
);

import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { personService } from './services';

import createHashHistory from 'history/createHashHistory';
const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

class Menu extends Component {
  render() {
    return (
      <div>
        <NavLink to="/persons">Person</NavLink>
      </div>
    );
  }
}

class PersonList extends Component {
  persons = [];

  render() {
    return (
      <ul>
        {this.persons.map(person => (
          <li key={person.person_id}>
            <NavLink to={'/persons/' + person.person_id + '/edit'}>{person.fornavn}</NavLink>
          </li>
        ))}
      </ul>
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
        Etternavn: <input type="text" value={this.etternavn} onChange={event => (this.etternavn = event.target.value)} />
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
    personService.updatePerson(this.props.match.params.person_id, this.fornavn, this.etternavn, this.tlf, this.epost, () => {
      history.push('/persons');
    });
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/persons" component={PersonList} />
      <Route path="/persons/:person_id/edit" component={PersonEdit} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);

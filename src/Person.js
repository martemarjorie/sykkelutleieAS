import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { personService } from './services';
import { Card, Row, Column, NavBar, Form } from './widgets';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default class PersonList extends Component {
  persons = [];

  render() {
    return (
      <Card title="Kundeliste">
        <input type="text" id="sok" onChange={this.sokKunde} placeholder="Søk..." />
        <br />
        <br />
        <Table responsive hover>
          <thead>
            <tr>
              <th>Fornavn</th>
              <th>Etternavn</th>
              <th>Tlf</th>
              <th>Epost</th>
              <th>
                <NavLink to={'/persons/add'}>Legg til</NavLink>
              </th>
            </tr>
          </thead>

          {this.persons.map(person => (
            <tbody>
              <tr key={person.person_id}>
                <td>{person.fornavn}</td>
                <td>{person.etternavn}</td>
                <td>{person.tlf}</td>
                <td>{person.epost}</td>
                <td>
                  <Button>Endre</Button>
                  <NavLink to={'/persons/' + person.person_id + '/edit'}>Endre</NavLink>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Card>
    );
  }

  sokKunde() {
    if (document.getElementById('sok').value.length === 0) {
      personService.getPersons(persons => {
        this.persons = persons;
      });
    } else {
      personService.searchPerson(document.getElementById('sok').value, persons => {
        this.persons = persons;
      });
    }
  }
  mounted() {
    personService.getPersons(persons => {
      this.persons = persons;
    });
  }
}

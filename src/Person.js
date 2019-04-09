import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { personService } from './services';
import { Card, NavBar } from './widgets';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class PersonList extends Component {
  persons = [];

  render() {
    return (
      <Row style={{ marginLeft: '2%', marginTop: '2%', marginRight: '2%', marginBottom: '2%' }}>
        <Col>
          <Card title="Kundeliste">
            <input type="text" id="sok" onChange={this.sokKunde} placeholder="Søk..." />
            <br />
            <br />
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Fornavn</th>
                  <th>Etternavn</th>
                  <th>Tlf</th>
                  <th>Epost</th>
                  <th>
                    <NavLink to={'/persons/add'}>
                      <Button>Legg til ny</Button>
                    </NavLink>
                  </th>
                </tr>
              </thead>

              {this.persons.map(person => (
                <tbody>
                  <tr key={person.person_id}>
                    <td>{person.person_id}</td>
                    <td>{person.fornavn}</td>
                    <td>{person.etternavn}</td>
                    <td>{person.tlf}</td>
                    <td>{person.epost}</td>
                    <td>
                      <NavLink to={'/persons/' + person.person_id + '/edit'}>
                        <Button variant="outline-primary">Endre</Button>
                      </NavLink>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </Card>
        </Col>
      </Row>
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

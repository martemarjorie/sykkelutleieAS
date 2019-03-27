import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { personService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';

export default class PersonList extends Component {
  persons = [];

  render() {
    return (
      <Card title="Kundeliste">
        <Row>
        <Column><h5>Fornavn</h5></Column>
        <Column><h5>Etternavn</h5></Column>
        <Column><h5>Telefon</h5></Column>
        <Column><h5>E-post</h5></Column>
      </Row>
        {this.persons.map(person => (
          <Row>
            <Column key={person.person_id}>
              <NavLink to={'/persons/' + person.person_id + '/edit'}>{person.fornavn}</NavLink>
            </Column>
            <Column>
              <NavLink to={'/persons/' + person.person_id + '/edit'}>{person.etternavn}</NavLink>
            </Column>
            <Column>
              <NavLink to={'/persons/' + person.person_id + '/edit'}>{person.tlf}</NavLink>
            </Column>
            <Column>
              <NavLink to={'/persons/' + person.person_id + '/edit'}>{person.epost}</NavLink>
            </Column>
          </Row>
        ))}
        <NavLink to={'/persons/add'}>Legg til</NavLink>
      </Card>
    );
  }

  mounted() {
    personService.getPersons(persons => {
      this.persons = persons;
    });
  }
}

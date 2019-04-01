import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { personService, sykkelService, bestillingService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export default class BestillingList extends Component {
  persons = [];

  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    let i = 0;
    console.log('1. State: ' + this.state.value);
    console.log('2. Persons: ' + this.persons);
    for (i = 1; i < this.persons.length; i++) {
      if (this.persons[i].tlf == this.state.value) {
        console.log("Fornavn: " + this.persons[i].fornavn);
        console.log("Etternavn: " + this.persons[i].etternavn);
        console.log("Tlf: " +this.persons[i].tlf);
        console.log("Epost: " + this.persons[i].epost);


        {this.persons.map(person => (
          <Card>
          <tbody>
            <tr key={person.person_id}>
              <td>{person.fornavn}</td>
              <td>{person.etternavn}</td>
              <td>{person.tlf}</td>
              <td>{person.epost}</td>
              <td>
                <NavLink to={'/persons/' + '/edit'}>Endre</NavLink>
              </td>
            </tr>
          </tbody>
          </Card>
        ))};
        break;
      } else {
        console.log(i + "...");
      }
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Telefonnummer:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Finn kunde" />
        </form>
      </div>
    );
  }

  mounted() {
    personService.getPersons(persons => {
      this.persons = persons;
    });
  }
}

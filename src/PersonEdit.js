import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { personService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';

export default class PersonEdit extends Component {
  fornavn = '';
  etternavn = '';
  tlf = '';
  epost = '';

  render() {
    return (
      <table>
        <tbody>
          <tr>
            <tr>
              Fornavn:{' '}
              <input type="text" value={this.fornavn} onChange={event => (this.fornavn = event.target.value)} />
            </tr>
            <tr>
              Etternavn:{' '}
              <input type="text" value={this.etternavn} onChange={event => (this.etternavn = event.target.value)} />
            </tr>
            <tr>
              Tlf: <input type="number" value={this.tlf} onChange={event => (this.tlf = event.target.value)} />
            </tr>
            <tr>
              Epost: <input type="text" value={this.epost} onChange={event => (this.epost = event.target.value)} />
            </tr>
            <tr>
              <Row>
                <Column right>
                  <Button.Danger onClick={this.delete}>Delete</Button.Danger>
                </Column>
              </Row>
            </tr>
          </tr>
        </tbody>
      </table>
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

  delete() {
    personService.deletePerson(this.props.match.params.person_id, () => history.push('/persons'));
  }

  deletePerson(person_id, success) {
    connection.query('delete from Persons where person_id = ?', [person_id], (error, results) => {
      if (error) return console.error(error);

      success();
    });
  }
}

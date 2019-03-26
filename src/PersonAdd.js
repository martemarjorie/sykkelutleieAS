import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { personService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';

export default class PersonAdd extends Component {
  fornavn = '';
  etternavn = '';
  tlf = '';
  epost = '';

  render() {
    return (
      <form>
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
                  <Column left>
                    <button type="button" onClick={this.add}>
                      Legg til
                    </button>
                  </Column>
                </Row>
              </tr>
            </tr>
          </tbody>
        </table>
      </form>
    );
  }

  add() {
    personService.addPerson(
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

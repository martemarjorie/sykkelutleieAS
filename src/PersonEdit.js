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
      <div style={{display:"inline-block", marginLeft:"44%",marginTop:"3%"}}>
      <form>
        <table>
          <tbody>
            <tr>
              <tr>
                Fornavn:{' '}<br></br>
                <input type="text" value={this.fornavn} onChange={event => (this.fornavn = event.target.value)} />
              </tr>
              <p></p>
              <tr>
                Etternavn:{' '}<br></br>
                <input type="text" value={this.etternavn} onChange={event => (this.etternavn = event.target.value)} />
              </tr>
              <p></p>
              <tr>
                Tlf:<br></br> <input type="number" value={this.tlf} onChange={event => (this.tlf = event.target.value)} />
              </tr>
              <p></p>
              <tr>
                Epost:<br></br> <input type="text" value={this.epost} onChange={event => (this.epost = event.target.value)} />
              </tr>
              <p></p>
              <tr>
                <Row>
                  <Column left>
                    <button type="button" onClick={this.save}>
                      Lagre
                    </button>
                  </Column>
                  <Column right>
                    <button type="button" onClick={this.delete}>
                      Slett
                    </button>
                  </Column>
                </Row>
              </tr>
            </tr>
          </tbody>
        </table>
      </form>
      </div>
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

  delete() {
    personService.deletePerson(
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

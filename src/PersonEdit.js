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
      <div style={{ display: 'inline-block', marginLeft: '44%', marginTop: '3%' }}>
        <form>
          <table>
            <tbody>
              <tr>
                <tr>
                  Fornavn: <br />
                  <input type="text" value={this.fornavn} onChange={event => (this.fornavn = event.target.value)} />
                </tr>
                <p />
                <tr>
                  Etternavn: <br />
                  <input type="text" value={this.etternavn} onChange={event => (this.etternavn = event.target.value)} />
                </tr>
                <p />
                <tr>
                  Tlf:<br />{' '}
                  <input type="number" value={this.tlf} onChange={event => (this.tlf = event.target.value)} />
                </tr>
                <p />
                <tr>
                  Epost:<br />{' '}
                  <input type="text" value={this.epost} onChange={event => (this.epost = event.target.value)} />
                </tr>
                <p />
                <tr>
                  <Row>
                    <Column left>
                      <button style={{position:"absolute", width:"80px", backgroundColor:"peru", color:"cornsilk"}} type="button" onClick={(this.save(), this.buttonClicked)}>
                        Lagre
                      </button>
                    </Column>
                    <Column right>
                      <button style={{position:"absolute", width:"80px", backgroundColor:"peru", color:"cornsilk", marginLeft:"70px"}} type="button" onClick={(this.delete(), this.buttonClicked)}>
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

  buttonClicked() {
    this.props.history.push('/persons');
    console.log('Save clicked');
  }
}

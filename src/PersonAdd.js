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
      <div style={{display:"inline-block", marginLeft:"44%",marginTop:"3%"}}>
      <form>
        <table>
          <tbody>
            <tr>
              <tr>
                Fornavn:{' '}<br></br>
                <input type="text" value={this.fornavn} onChange={event => (this.fornavn = event.target.value)} />
              </tr>
              <br></br>
              <tr>
                Etternavn:{' '}<br></br>
                <input type="text" value={this.etternavn} onChange={event => (this.etternavn = event.target.value)} />
              </tr>
              <br></br>
              <tr>
                Tlf:<br></br> <input type="number" value={this.tlf} onChange={event => (this.tlf = event.target.value)} />
              </tr>
              <br></br>
              <tr>
                Epost: <br></br>
                <input type="text" value={this.epost} onChange={event => (this.epost = event.target.value)} />
              </tr>
              <br></br>
              <tr>
                <Row>
                  <Column left>
                    <button style={{position:"absolute", width:"182px", backgroundColor:"peru", color:"cornsilk"}} type="button" onClick={this.add}>
                      Legg til
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

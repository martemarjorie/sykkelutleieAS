import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { utstyrService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';

export default class PersonAdd extends Component {
  type_utstyr = '';
  beskrivelse = '';
  pris = '';

  render() {
    return (
      <div style={{ display: 'inline-block', marginLeft: '44%', marginTop: '3%' }}>
        <form>
          <table>
            <tbody>
              <tr>
                <tr>
                  Type utstyr: <br />
                  <input
                    type="text"
                    value={this.type_utstyr}
                    onChange={event => (this.type_utstyr = event.target.value)}
                  />
                </tr>
                <br />
                <tr>
                  Beskrivelse: <br />
                  <input
                    type="text"
                    value={this.beskrivelse}
                    onChange={event => (this.beskrivelse = event.target.value)}
                  />
                </tr>
                <br />
                <tr>
                  Pris:
                  <br /> <input type="number" value={this.pris} onChange={event => (this.pris = event.target.value)} />
                </tr>
                <br />
                <tr>
                  <Row>
                    <Column left>
                      <button
                        style={{ position: 'absolute', width: '182px', backgroundColor: 'peru', color: 'cornsilk' }}
                        type="button"
                        onClick={this.add}
                      >
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
    utstyrService.addUtstyr(this.props.match.params.utstyr_id, this.type_utstyr, this.beskrivelse, this.pris, () => {
      history.push('/utstyrer');
    });
    this.props.history.replace('/utstyrer/');
  }
}

import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { sykkelService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';

export default class SykkelAdd extends Component {
  type_sykkel = '';
  ramme = '';
  hjul_storrelse = '';
  girsystem = '';

  render() {
    return (
      <form>
        <table>
          <tbody>
            <tr>
              <tr>
                Type:{' '}
                <input
                  type="text"
                  value={this.type_sykkel}
                  onChange={event => (this.type_sykkel = event.target.value)}
                />
              </tr>
              <tr>
                Ramme: <input type="text" value={this.ramme} onChange={event => (this.ramme = event.target.value)} />
              </tr>
              <tr>
                Hjulstrl:{' '}
                <input
                  type="number"
                  value={this.hjul_storrelse}
                  onChange={event => (this.hjul_storrelse = event.target.value)}
                />
              </tr>
              <tr>
                Girsystem:{' '}
                <input type="text" value={this.girsystem} onChange={event => (this.girsystem = event.target.value)} />
              </tr>
              <tr>
                Timepris:{' '}
                <input type="text" value={this.timepris} onChange={event => (this.timepris = event.target.value)} />
              </tr>
              <tr>
                Dagspris:{' '}
                <input type="text" value={this.dagspris} onChange={event => (this.dagspris = event.target.value)} />
              </tr>
              <tr>
                Modell: <input type="text" value={this.modell} onChange={event => (this.modell = event.target.value)} />
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
    sykkelService.addSykkel(
      this.props.match.params.sykkel_id,
      this.type_sykkel,
      this.ramme,
      this.hjul_storrelse,
      this.girsystem,
      () => {
        history.push('/sykler');
      }
    );
  }
}

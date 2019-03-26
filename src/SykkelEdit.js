import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { sykkelService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';

export default class SykkelEdit extends Component {
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
                  onChange={event => (this.Hjul_storrelse = event.target.value)}
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
                Tilhører:{' '}
                <input
                  type="text"
                  value={this.tilhorer_sted}
                  onChange={event => (this.tilhorer_sted = event.target.value)}
                />
              </tr>
              <tr>
                Modell: <input type="text" value={this.modell} onChange={event => (this.modell = event.target.value)} />
              </tr>
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
    );
  }

  mounted() {
    sykkelService.getSykkel(this.props.match.params.sykkel_id, sykkel => {
      this.type_sykkel = sykkel.type_sykkel;
      this.ramme = sykkel.ramme;
      this.hjul_storrelse = sykkel.hjul_storrelse;
      this.girsystem = sykkel.girsystem;
      this.timepris = sykkel.timepris;
      this.dagspris = sykkel.dagspris;
      this.tilhorer_sted = sykkel.tilhorer_sted;
      this.modell = sykkel.modell;
    });
  }

  save() {
    sykkelService.updateSykkel(
      this.props.match.params.sykkel_id,
      this.type_sykkel,
      this.ramme,
      this.hjul_storrelse,
      this.girsystem,
      this.timepris,
      this.dagspris,
      this.tilhorer_sted,
      this.modell,
      () => {
        history.push('/sykler');
      }
    );
  }

  delete() {
    sykkelService.deleteSykkel(
      this.props.match.params.sykkel_id,
      this.type_sykkel,
      this.ramme,
      this.hjul_storrelse,
      this.girsystem,
      this.timepris,
      this.dagspris,
      this.tilhorer_sted,
      this.modell,
      () => {
        history.push('/sykler');
      }
    );
  }
}

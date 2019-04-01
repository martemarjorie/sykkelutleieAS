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
  timepris = '';
  dagspris = '';
  tilhorer_sted = '';
  modell = '';

  render() {
    return (
      <div style={{ display: 'inline-block', marginLeft: '44%', marginTop: '3%' }}>
        <form>
          <table>
            <tbody>
              <tr>
                <tr>
                  Type: <br />
                  <input
                    type="text"
                    value={this.type_sykkel}
                    onChange={event => (this.type_sykkel = event.target.value)}
                  />
                </tr>
                <p />
                <tr>
                  Ramme: <br />
                  <input
                  type="number"
                  value={this.ramme}
                  onChange={event => (this.ramme = event.target.value)}
                  />
                </tr>
                <p />
                <tr>
                  Hjulstørrelse:
                  <br />{' '}
                  <input
                    type="number"
                    value={this.hjul_storrelse}
                    onChange={event => (this.hjul_storrelse = event.target.value)}
                  />
                </tr>
                <p />
                <tr>
                  Girsystem:
                  <br />{' '}
                  <input
                    type="number"
                    value={this.girsystem}
                    onChange={event => (this.girsystem = event.target.value)}
                  />
                </tr>
                <p />
                <tr>
                  Timepris:
                  <br />{' '}
                  <input
                  type="number"
                  value={this.timepris}
                  onChange={event => (this.timepris = event.target.value)}
                  />
                </tr>
                <p />
                <tr>
                  Dagspris:
                  <br />{' '}
                  <input
                  type="number"
                  value={this.dagspris}
                  onChange={event => (this.dagspris = event.target.value)}
                  />
                </tr>
                <p />
                <tr>
                  Tilhører:
                  <br />{' '}
                  <input
                    type="text"
                    value={this.tilhorer_sted}
                    onChange={event => (this.tilhorer_sted = event.target.value)}
                  />
                </tr>
                <p />
                <tr>
                  Modell:
                  <br />{' '}
                  <input
                  type="text"
                  value={this.modell}
                  onChange={event => (this.modell = event.target.value)}
                  />
                </tr>
                <p />
                <tr>
                  <Row>
                    <Column left>
                      <button
                        style={{ position:
                          'absolute',
                          width: '80px',
                          backgroundColor: 'peru',
                          color: 'cornsilk' }}
                        type="button"
                        onClick={this.save} // this.buttonClicked
                      >
                        Lagre
                      </button>
                    </Column>
                    <Column right>
                      <button
                        style={{
                          position: 'absolute',
                          width: '80px',
                          backgroundColor: 'peru',
                          color: 'cornsilk',
                          marginLeft: '70px'
                        }}
                        type="button"
                        onClick={this.delete} // this.buttonClicked
                      >
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

import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { fraktService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';

export default class FraktEdit extends Component {
  type_sykkel = '';
  modell = '';
  fra_sted = '';
  til_sted = '';
  fra_dato = '';
  status = '';

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
                  Modell: <br />
                  <input type="text" value={this.modell} onChange={event => (this.modell = event.target.value)} />
                </tr>
                <p />
                <tr>
                  Fra sted:
                  <br />{' '}
                  <input type="text" value={this.fra_sted} onChange={event => (this.fra_sted = event.target.value)} />
                </tr>
                <p />
                <tr>
                  Til sted:
                  <br />{' '}
                  <input type="text" value={this.til_sted} onChange={event => (this.til_sted = event.target.value)} />
                </tr>
                <p />

                <tr>
                  Status:
                  <br />{' '}
                  <input type="text" value={this.status} onChange={event => (this.status = event.target.value)} />
                </tr>
                <p />
                <tr>
                  <Row>
                    <Column left>
                      <button
                        style={{ position: 'absolute', width: '80px', backgroundColor: 'peru', color: 'cornsilk' }}
                        type="button"
                        onClick={this.save}
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
                        onClick={this.delete}
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
    fraktService.getFrakter(this.props.match.params.frakt_id, frakt => {
      this.type_sykkel = frakt.type_sykkel;
      this.modell = frakt.modell;
      this.fra_sted = frakt.fra_sted;
      this.til_sted = frakt.til_sted;
      this.fra_dato = frakt.fra_dato;
      this.status = frakt.status;
    });
  }

  save() {
    fraktService.updateFrakt(
      this.props.match.params.frakt_id,
      this.type_sykkel,
      this.modell,
      this.fra_sted,
      this.til_sted,
      this.fra_dato,
      this.status,
      () => {
        history.push('/frakter');
      }
    );
  }

  delete() {
    fraktService.deleteFrakt(
      this.props.match.params.frakt_id,
      this.type_sykkel,
      this.modell,
      this.fra_sted,
      this.til_sted,
      this.fra_dato,
      this.status,
      () => {
        history.push('/frakter');
      }
    );
  }
}

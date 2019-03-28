import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { bestillingService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';

export default class BestillingEdit extends Component {
  type_sykkel = '';
  modell = '';
  utlev_tidspunkt = '';
  innlev_tidspunkt = '';
  utlev_sted = '';
  innlev_sted = '';
  fornavn = '';
  tlf = '';

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
                Modell:
                <input type="text" value={this.modell} onChange={event => (this.modell = event.target.value)} />
              </tr>
              <tr>
                Utleveringstidspunkt:{' '}
                <input
                  type="number"
                  value={this.utlev_tidspunkt}
                  onChange={event => (this.utlev_tidspunkt = event.target.value)}
                />
              </tr>
              <tr>
                Innleveringstidspunkt:{' '}
                <input
                  type="text"
                  value={this.innlev_tidspunkt}
                  onChange={event => (this.innlev_tidspunkt = event.target.value)}
                />
              </tr>
              <tr>
                Utleveringssted:{' '}
                <input type="text" value={this.utlev_sted} onChange={event => (this.utlev_sted = event.target.value)} />
              </tr>
              <tr>
                <tr>
                  Innleveringssted:{' '}
                  <input
                    type="text"
                    value={this.innlev_sted}
                    onChange={event => (this.innlev_sted = event.target.value)}
                  />
                </tr>
                <tr>
                  Fornavn:{' '}
                  <input type="text" value={this.fornavn} onChange={event => (this.fornavn = event.target.value)} />
                </tr>
                <tr>
                  Tlf:
                  <input type="text" value={this.tlf} onChange={event => (this.tlf = event.target.value)} />
                </tr>
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
    bestillingService.getBestillingsinfoer(this.props.match.params.bestilling_id, bestillingsinfo => {
      this.type_sykkel = bestillingsinfo.type_sykkel;
      this.modell = bestillingsinfo.modell;
      this.utlev_tidspunkt = bestillingsinfo.utlev_tidspunkt;
      this.innlev_tidspunkt = bestillingsinfo.innlev_tidspunkt;
      this.utlev_sted = bestillingsinfo.utlev_sted;
      this.innlev_sted = bestillingsinfo.innlev_sted;
      this.fornavn = bestillingsinfo.fornavn;
      this.tlf = bestillingsinfo.tlf;
    });
  }

  save() {
    bestillingService.updateBestillingsinfoer(
      this.props.match.params.bestilling_id,
      this.type_sykkel,
      this.modell,
      this.utlev_tidspunkt,
      this.innlev_tidspunkt,
      this.utlev_sted,
      this.innlev_sted,
      this.fornavn,
      this.tlf,
      () => {
        history.push('/bestillingsinfoer');
      }
    );
  }

  delete() {
    bestillingService.deleteBestillingsinfoer(
      this.props.match.params.bestilling_id,
      this.type_sykkel,
      this.modell,
      this.utlev_tidspunkt,
      this.innlev_tidspunkt,
      this.utlev_sted,
      this.innlev_sted,
      this.fornavn,
      this.tlf,
      () => {
        history.push('/bestillingsinfoer');
      }
    );
  }
}

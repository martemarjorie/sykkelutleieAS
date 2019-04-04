import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { bestillingerService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';

export default class BestillingerEdit extends Component {
  utlev_tidspunkt = '';
  innlev_tidspunkt = '';

  render() {
    return (
      <form>
        <table>
          <tbody>
            <tr>
              <tr>
                Utleveringstidspunkt:{' '}
                <input
                  type="date"
                  value={this.utlev_tidspunkt}
                  onChange={event => (this.utlev_tidspunkt = event.target.value)}
                />
              </tr>
              <tr>
                Innleveringstidspunkt:{' '}
                <input
                  type="date"
                  value={this.innlev_tidspunkt}
                  onChange={event => (this.innlev_tidspunkt = event.target.value)}
                />
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
          </tbody>
        </table>
      </form>
    );
  }

  mounted() {
    bestillingerService.getBestillinger(this.props.match.params.bestilling_id, bestillinger => {
      this.type_sykkel = bestilling.type_sykkel;
      this.modell = bestilling.modell;
      this.utlev_tidspunkt = bestilling.utlev_tidspunkt;
      this.innlev_tidspunkt = bestilling.innlev_tidspunkt;
      this.utlev_sted = bestilling.utlev_sted;
      this.innlev_sted = bestilling.innlev_sted;
    });
  }

  save() {
    bestillingerService.updateBestillinger(
      this.props.match.params.bestilling_id,
      this.utlev_tidspunkt,
      this.innlev_tidspunkt,
      () => {
        history.push('/bestillinger');
      }
    );
  }
  /*
  delete() {
    bestillingerService.deleteBestillinger(
      this.props.match.params.bestilling_id,
      this.type_sykkel,
      this.modell,
      this.utlev_tidspunkt,
      this.innlev_tidspunkt,
      this.utlev_sted,
      this.innlev_sted,
      () => {
        history.push('/bestillinger');
      }
    );
  }
  */
}

/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

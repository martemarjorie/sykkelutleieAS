import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { bestillingService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';

export default class BestillingsInfo extends Component {
  bestillingsinfoer = [];

  render() {
    return (
      <Card title="Bestillingsoversikt">
        <Row>
          <Column>
            <h5>Fornavn</h5>
          </Column>
          <Column>
            <h5>Telefon</h5>
          </Column>
          <Column>
            <h5>Type</h5>
          </Column>
          <Column>
            <h5>Modell</h5>
          </Column>
          <Column>
            <h5>Utleveringssted</h5>
          </Column>
          <Column>
            <h5>Innleveringssted</h5>
          </Column>
          <Column>
            <h5>Utleveringsdato</h5>
          </Column>
          <Column>
            <h5>Innleveringsdato</h5>
          </Column>
        </Row>
        {this.bestillingsinfoer.map(bestillingsinfo => (
          <Row key={bestillingsinfo.bestilling_id}>
            <Column>
              <NavLink to={'/bestillingsinfoer/' + bestillingsinfo.fornavn + '/edit'}>
                {bestillingsinfo.fornavn}
              </NavLink>
            </Column>
            <Column>
              <NavLink to={'/bestillingsinfoer/' + bestillingsinfo.tlf + '/edit'}>{bestillingsinfo.tlf}</NavLink>
            </Column>
            <Column>
              <NavLink to={'/bestillingsinfoer/' + bestillingsinfo.type_sykkel + '/edit'}>
                {bestillingsinfo.type_sykkel}
              </NavLink>
            </Column>
            <Column>
              <NavLink to={'/bestillingsinfoer/' + bestillingsinfo.modell + '/edit'}>{bestillingsinfo.modell}</NavLink>
            </Column>
            <Column>
              <NavLink to={'/bestillingsinfoer/' + bestillingsinfo.utlev_sted + '/edit'}>
                {bestillingsinfo.utlev_sted}
              </NavLink>
            </Column>
            <Column>
              <NavLink to={'/bestillingsinfoer/' + bestillingsinfo.innlev_sted + '/edit'}>
                {bestillingsinfo.innlev_sted}
              </NavLink>
            </Column>
            <Column>
              <NavLink to={'/bestillingsinfoer/' + bestillingsinfo.utlev_tidspunkt + '/edit'}>
                {bestillingsinfo.utlev_tidspunkt.getDate() +
                  '.' +
                  (bestillingsinfo.utlev_tidspunkt.getMonth() + 1) +
                  '.' +
                  bestillingsinfo.utlev_tidspunkt.getFullYear()}
              </NavLink>
            </Column>
            <Column>
              <NavLink to={'/bestillingsinfoer/' + bestillingsinfo.innlev_tidspunkt + '/edit'}>
                {bestillingsinfo.innlev_tidspunkt.getDate() +
                  '.' +
                  (bestillingsinfo.innlev_tidspunkt.getMonth() + 1) +
                  '.' +
                  bestillingsinfo.innlev_tidspunkt.getFullYear()}
              </NavLink>
            </Column>
          </Row>
        ))}
      </Card>
    );
  }
  mounted() {
    bestillingService.getBestillingsinfoer(bestillingsinfoer => {
      this.bestillingsinfoer = bestillingsinfoer;
    });
  }
}

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
        {this.bestillingsinfoer.map(bestillingsinfo => (
          <Row key={bestillingsinfo.bestilling_id}>
            <Column>
              <NavLink to={'/bestillingsinfoer/' + bestillingsinfo.bestilling_id + '/edit'}>
                {bestillingsinfo.fornavn}
              </NavLink>
            </Column>
            <Column>
              <NavLink to={'/bestillingsinfoer/' + bestillingsinfo.type_sykkel + '/edit'}>
                {bestillingsinfo.type_stkkel}
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
                {bestillingsinfo.utlev_tidspunkt}
              </NavLink>
            </Column>
            <Column>
              <NavLink to={'/bestillingsinfoer/' + bestillingsinfo.innlev_sted + '/edit'}>
                {bestillingsinfo.innlev_sted}
              </NavLink>
            </Column>
            <Column>
              <NavLink to={'/bestillingsinfoer/' + bestillingsinfo.fornavn + '/edit'}>
                {bestillingsinfo.fornavn}
              </NavLink>
            </Column>
            <Column>
              <NavLink to={'/bestillingsinfoer/' + bestillingsinfo.tlf + '/edit'}>{bestillingsinfo.tlf}</NavLink>
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

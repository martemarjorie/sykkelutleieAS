import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { bestillingService } from './services';
// import { Card, Row, Column, NavBar, Button, Form } from './widgets';
import { Card, Row, Column, NavBar, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

export default class BestillingsInfo extends Component {
  bestillingsinfoer = [];

  render() {
    return (
      <Card>
      <Card.Title>Bestillingsoversikt</Card.Title>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Kunde</th>
              <th>Tlf</th>
              <th>Sykkeltype</th>
              <th>Modell</th>
              <th>Utlevering</th>
              <th>Innlevering</th>
              <th>Fra dato</th>
              <th>Til dato</th>
              <th></th>
            </tr>
          </thead>

          {this.bestillingsinfoer.map(bestillingsinfo => (
            <tbody>
              <tr key={bestillingsinfo.bestilling_id}>
                <td>{bestillingsinfo.fornavn}</td>
                <td>{bestillingsinfo.tlf}</td>
                <td>{bestillingsinfo.type_sykkel}</td>
                <td>{bestillingsinfo.modell}</td>
                <td>{bestillingsinfo.utlev_sted}</td>
                <td>{bestillingsinfo.innlev_sted}</td>
                <td>
                  {('0' + bestillingsinfo.utlev_tidspunkt.getDate()).slice(-2) +
                    '.' +
                    ('0' + (bestillingsinfo.utlev_tidspunkt.getMonth() + 1)).slice(-2) +
                    '.' +
                    bestillingsinfo.utlev_tidspunkt.getFullYear()}
                </td>
                <td>
                  {('0' + bestillingsinfo.innlev_tidspunkt.getDate()).slice(-2) +
                    '.' +
                    ('0' + (bestillingsinfo.innlev_tidspunkt.getMonth() + 1)).slice(-2) +
                    '.' +
                    bestillingsinfo.innlev_tidspunkt.getFullYear()}
                </td>
                <td>
                  <NavLink to={'/bestilling/' + bestillingsinfo.bestilling_id + '/edit'}>Endre</NavLink>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Card>
    );
  }
  mounted() {
    bestillingService.getBestillingsinfoer(bestillingsinfoer => {
      this.bestillingsinfoer = bestillingsinfoer;
    });
  }
}

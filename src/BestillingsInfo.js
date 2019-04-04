import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { bestillingerService } from './services';
// import { Card, Row, Column, NavBar, Button, Form } from './widgets';
import { Card, Row, Column, NavBar, Button } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';

export default class BestillingsList extends Component {
  bestillinger = [];

  render() {
    return (
      <Card>
        <Card.Title>Bestillingsoversikt</Card.Title>
        <Table responsive hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Kunde</th>
              <th>Tlf</th>
              <th>Type</th>
              <th>Modell</th>
              <th>Fra dato</th>
              <th>Til dato</th>
              <th>Utlevering</th>
              <th>Innlevering</th>
              <th> </th>
            </tr>
          </thead>

          {this.bestillinger.map(bestilling => (
            <tbody>
              <tr key={bestilling.bestilling_id}>
                <td>{bestilling.bestilling_id}</td>
                <td>{bestilling.fornavn}</td>
                <td>{bestilling.tlf}</td>
                <td>{bestilling.type_sykkel}</td>
                <td>{bestilling.modell}</td>
                <td>
                  {('0' + bestilling.utlev_tidspunkt.getDate()).slice(-2) +
                    '.' +
                    ('0' + (bestilling.utlev_tidspunkt.getMonth() + 1)).slice(-2) +
                    '.' +
                    bestilling.utlev_tidspunkt.getFullYear()}
                </td>
                <td>
                  {('0' + bestilling.innlev_tidspunkt.getDate()).slice(-2) +
                    '.' +
                    ('0' + (bestilling.innlev_tidspunkt.getMonth() + 1)).slice(-2) +
                    '.' +
                    bestilling.innlev_tidspunkt.getFullYear()}
                </td>
                <td>{bestilling.utlev_sted}</td>
                <td>{bestilling.innlev_sted}</td>
                <td>
                  <NavLink to={'/bestillinger/' + bestilling.bestilling_id + '/edit'}>Endre</NavLink>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Card>
    );
  }
  mounted() {
    bestillingerService.getBestillinger(bestillinger => {
      this.bestillinger = bestillinger;
    });
  }
}

import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { fraktService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';
import Table from 'react-bootstrap/Table';

export default class FraktList extends Component {
  frakter = [];

  render() {
    return (
      <Card title="Oversikt over frakt">
        <Table responsive hover>
          <thead>
            <tr>
              <th>Type</th>
              <th>Modell</th>
              <th>Fra sted</th>
              <th>Til sted</th>
              <th>Dato for frakt</th>
              <th>Status</th>
              <th>
                <NavLink to={'/frakter/add'}>Legg til</NavLink>
              </th>
            </tr>
          </thead>

          {this.frakter.map(frakt => (
            <tbody>
              <tr key={frakt.frakt_id}>
                <td>{frakt.type_sykkel}</td>
                <td>{frakt.modell}</td>
                <td>{frakt.fra_sted}</td>
                <td>{frakt.til_sted}</td>
                <td>
                  {('0' + frakt.frakt_dato.getDate()).slice(-2) +
                    '.' +
                    ('0' + (frakt.frakt_dato.getMonth() + 1)).slice(-2) +
                    '.' +
                    frakt.frakt_dato.getFullYear()}
                </td>
                <td>{frakt.status}</td>

                <td>
                  <NavLink to={'/frakter/' + frakt.frakt_id + '/edit'}>Endre</NavLink>
                </td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Card>
    );
  }

  mounted() {
    fraktService.getFrakter(frakter => {
      this.frakter = frakter;
    });
  }
}

import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { utstyrService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';
import Table from 'react-bootstrap/Table';

export default class UtstyrList extends Component {
  utstyrer = [];

  render() {
    return (
      <Card title="Utstyrsliste">
        <Table responsive hover>
          <thead>
            <tr>
              <th>Type utstyr</th>
              <th>Beskrivelse</th>
              <th>Pris</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {this.utstyrer.map(utstyr => (
              <tr key={utstyr.utstyr_id}>
                <td>{utstyr.type_utstyr}</td>
                <td>{utstyr.beskrivelse}</td>
                <td>{utstyr.pris}</td>
                <td>
                  <NavLink to={'/utstyrer/' + utstyr.utstyr_id + '/edit'}>Endre</NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <br />
        <NavLink to={'/utstyrer/add'}>Legg til ny</NavLink>
      </Card>
    );
  }

  mounted() {
    utstyrService.getUtstyrer(utstyrer => {
      this.utstyrer = utstyrer;
    });
  }
}

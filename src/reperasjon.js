import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { repService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';
import Table from 'react-bootstrap/Table';

export default class RepList extends Component {
  reps = [];

  render() {
    return (
      <Card title="Reperasjoner">
        <Table responsive hover>
          <thead>
            <tr>
              <th>Reperasjon id</th>
              <th>Sykkel id</th>
              <th>Innlevering</th>
              <th>Utlevering</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          {this.reps.map(rep => (
            <tbody>
              <tr key={rep.reperasjons_id}>
                <td>{rep.reperasjons_id}</td>
                <td>{rep.sykkel_id}</td>
                <td>
                  {('0' + rep.repinnlev_dato.getDate()).slice(-2) +
                    '.' +
                    ('0' + (rep.repinnlev_dato.getMonth() + 1)).slice(-2) +
                    '.' +
                    rep.repinnlev_dato.getFullYear()}
                </td>
                <td>
                  {('0' + rep.reputlev_dato.getDate()).slice(-2) +
                    '.' +
                    ('0' + (rep.reputlev_dato.getMonth() + 1)).slice(-2) +
                    '.' +
                    rep.reputlev_dato.getFullYear()}
                </td>
                <td>{rep.rep_beskrivelse}</td>
              </tr>
            </tbody>
          ))}
        </Table>
      </Card>
    );
  }

  mounted() {
    repService.getReps(reps => {
      this.reps = reps;
    });
  }
}

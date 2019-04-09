import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { repService } from './services';
import { Card, NavBar, Button, Form } from './widgets';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class RepList extends Component {
  reps = [];

  render() {
    return (
<<<<<<< HEAD:src/Reparasjon.js
      <Card title="Reparasjoner">
        <Table responsive hover>
          <thead>
            <tr>
              <th>Reparasjon id</th>
              <th>Sykkel id</th>
              <th>Innlevering</th>
              <th>Utlevering</th>
              <th>Beskrivelse</th>
            </tr>
          </thead>
          {this.reps.map(rep => (
            <tbody>
              <tr key={rep.reparasjons_id}>
                <td>{rep.reparasjons_id}</td>
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
=======
      <Row style={{ marginLeft: '2%', marginTop: '2%', marginRight: '2%', marginBottom: '2%' }}>
        <Col>
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
        </Col>
      </Row>
>>>>>>> a58e92e2d4e180e58a373b1165bd0537b26cad93:src/reperasjon.js
    );
  }

  mounted() {
    repService.getReps(reps => {
      this.reps = reps;
    });
  }
}

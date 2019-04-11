import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { repService } from './services';
import { Card, Column, NavBar } from './widgets';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class RepList extends Component {
  reps = [];

  render() {
    return (
      <Row style={{ marginLeft: '2%', marginTop: '2%', marginRight: '2%', marginBottom: '2%' }}>
        <Col>
          <Card title="Reparasjoner">
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Reparasjon id</th>
                  <th>Sykkel id</th>
                  <th>Innlevering</th>
                  <th>Utlevering</th>
                  <th>Beskrivelse</th>
                  <th>
                    <NavLink to={'/reps/add'}>
                      <Button>Legg til ny</Button>
                    </NavLink>
                  </th>
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
                    <td>
                      <NavLink to={'/reps/' + rep.reparasjons_id + '/edit'}>
                        <Button variant="outline-primary">Endre</Button>
                      </NavLink>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </Card>
        </Col>
      </Row>
    );
  }

  mounted() {
    repService.getReps(reps => {
      this.reps = reps;
    });
  }
}

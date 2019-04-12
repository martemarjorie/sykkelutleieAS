import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { fraktService } from './services';
import { Card } from './widgets';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class FraktList extends Component {
  frakter = [];

    render() {
    return (
      <Row style={{ marginLeft: '2%', marginTop: '2%', marginRight: '2%', marginBottom: '2%' }}>
        <Col>
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
                    <NavLink to={'/frakter/add'}>
                      <Button>Legg til ny</Button>
                    </NavLink>
                  </th>
                </tr>
              </thead>

              {this.frakter.map(frakt => (
                <tbody>
                  <tr key={frakt.frakt_id}>
                    <td>{frakt.type_sykkel}</td>
                    <td>{frakt.modell}</td>
                    <td>{frakt.sted_navn, frakt.fra_sted}</td>
                    <td>{frakt.sted_id, frakt.til_sted}</td>
                    <td>
                      {('0' + frakt.frakt_dato.getDate()).slice(-2) +
                        '.' +
                        ('0' + (frakt.frakt_dato.getMonth() + 1)).slice(-2) +
                        '.' +
                        frakt.frakt_dato.getFullYear()}
                    </td>
                    <td>{frakt.status}</td>

                    <td>
                      <NavLink to={'/frakter/' + frakt.frakt_id + '/edit'}>
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
    fraktService.getFrakter(frakter => {
      this.frakter = frakter;
    });
  }
}

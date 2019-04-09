import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { utstyrService } from './services';
import { Card, NavBar, Form } from './widgets';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class UtstyrList extends Component {
  utstyrer = [];

  render() {
    return (
      <Row style={{ marginLeft: '2%', marginTop: '2%', marginRight: '2%', marginBottom: '2%' }}>
        <Col>
          <Card title="Utstyrsliste">
            <input type="text" id="sok" onChange={this.sokUtstyr} placeholder="Søk.." />
            <br />
            <br />
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Type utstyr</th>
                  <th>Beskrivelse</th>
                  <th>Pris</th>
                  <th>
                    <NavLink to={'/utstyrer/add'}>
                      <Button>Legg til ny</Button>
                    </NavLink>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.utstyrer.map(utstyr => (
                  <tr key={utstyr.utstyr_id}>
                    <td>{utstyr.utstyr_id}</td>
                    <td>{utstyr.type_utstyr}</td>
                    <td>{utstyr.beskrivelse}</td>
                    <td>{utstyr.pris}</td>
                    <td>
                      <NavLink to={'/utstyrer/' + utstyr.utstyr_id + '/edit'}>
                        <Button variant="outline-primary">Endre</Button>
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <br />
          </Card>
        </Col>
      </Row>
    );
  }

  sokUtstyr() {
    if (document.getElementById('sok').value.length === 0) {
      utstyrService.getUtstyr(utstyrer => {
        this.utstyrer = utstyrer;
      });
    } else {
      utstyrService.searchUtstyr(document.getElementById('sok').value, utstyrer => {
        this.utstyrer = utstyrer;
      });
    }
  }

  mounted() {
    utstyrService.getUtstyrer(utstyrer => {
      this.utstyrer = utstyrer;
    });
  }
}

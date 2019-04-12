import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { sykkelService } from './services';
import { Card } from './widgets';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class SykkelList extends Component {
  sykler = [];

  render() {
    return (
      <Row style={{ marginLeft: '2%', marginTop: '2%', marginRight: '2%', marginBottom: '2%' }}>
        <Col>
          <Card title="Sykler">
            <input type="text" id="sok" onChange={this.sokSykkel} placeholder="Søk..." />
            <br />
            <br />
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Type</th>
                  <th>Timepris</th>
                  <th>Dagspris</th>
                  <th>Modell</th>
                  <th>Tilhørighet</th>
                  <th>
                    <NavLink to={'/sykler/add'}>
                      <Button>Legg til ny</Button>
                    </NavLink>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.sykler.map(sykkel => (
                  <tr key={sykkel.sykkel_id}>
                    <td>{sykkel.sykkel_id}</td>
                    <td>{sykkel.type_sykkel}</td>
                    <td>{sykkel.timepris}</td>
                    <td>{sykkel.dagspris}</td>
                    <td>{sykkel.modell}</td>
                    <td>{sykkel.sted_navn}</td>
                    <td>
                      <NavLink to={'/sykler/' + sykkel.sykkel_id + '/edit'}>
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

  sokSykkel() {
    if (document.getElementById('sok').value.length === 0) {
      sykkelService.getSykkel(sykler => {
        this.sykler = sykler;
      });
    } else {
      sykkelService.searchSykkel(document.getElementById('sok').value, sykler => {
        this.sykler = sykler;
      });
    }
  }
  mounted() {
    sykkelService.getBikes(sykler => {
      this.sykler = sykler;
    });
  }
}

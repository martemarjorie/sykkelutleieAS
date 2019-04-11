import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { bestillingerService, bestillingService } from './services';
import { Card } from './widgets';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default class BestillingsList extends Component {
  bestillinger = [];

  render() {
    return (
      <Row style={{ marginLeft: '2%', marginTop: '2%', marginRight: '2%', marginBottom: '2%' }}>
        <Col>
          <Card title="Bestillingsoversikt">
            <input type="text" id="sok" onChange={this.sokBestilling} placeholder="Søk..." />
            <br />
            <br />
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Kunde</th>
                  <th>Tlf</th>
                  <th>Type</th>
                  <th>Modell</th>
                  <th>Utstyr</th>
                  <th>Fra dato</th>
                  <th>Til dato</th>
                  <th>Utlevering</th>
                  <th>Innlevering</th>
                  <th>
                    <NavLink to={'/nybestilling'}>
                      <Button>Legg til ny</Button>
                    </NavLink>
                  </th>
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
                      {bestilling.type_utstyr} {bestilling.beskrivelse}
                    </td>
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
                      <Button type="button" variant="danger" onClick={this.delete}>
                        Slett
                      </Button>
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
    bestillingerService.getBestillinger(bestillinger => {
      this.bestillinger = bestillinger;
    });
  }

  sokBestilling() {
    if (document.getElementById('sok').value.length === 0) {
      bestillingerService.getBestillinger(bestillinger => {
        this.bestillinger = bestillinger;
      });
    } else {
      bestillingerService.searchBestilling(document.getElementById('sok').value, bestillinger => {
        this.bestillinger = bestillinger;
      });
    }
  }

  delete() {
    bestillingService.deleteBestilling(
      this.props.match.params.bestilling_id,
      this.fornavn,
      this.tlf,
      this.type_sykkel,
      this.modell,
      this.type_utstyr,
      this.utlev_tidspunkt,
      this.innlev_tidspunkt,
      this.utlev_sted,
      this.innlev_sted,
      () => {
        history.push('/bestillinger');
      }
    );
    this.props.history.replace('/');
    console.log('slette-func kjørt');
  }
}

// importerer component fra react-biblioteket. 
// brukes for å lage en GUI-applikasjon med React 
import * as React from 'react';
import { Component } from 'react-simplified'; // component er en klasse som brukes til å lage et nytt komponent 
import { NavLink } from 'react-router-dom';
import { repService } from './services'; // importerer fraktService fra services.js - classen spørringene hentes fra 
import { Card } from './widgets'; // card elementene hentes fra widgets.js filen, styling  
import Table from 'react-bootstrap/Table'; // bruker elementer fra bootstrap for styling   
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// RepList er en subklasse av Component 
export default class RepList extends Component {
  // definerer et tomt array 'reps'
  reps = [];

  render() {
    return (
      <Row style={{ marginLeft: '2%', marginTop: '2%', marginRight: '2%', marginBottom: '2%' }}>
        <Col>
          <Card title="Reparasjoner">
          {/* lager en tabell med all informasjon */}
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
               {/* går gjennom alle reparasjonene */} 
              {/* .map() funksjonen går gjennom alle elementene i en array i en rekkefølge */}
              {this.reps.map(rep => (
                <tbody>
                  <tr key={rep.reparasjons_id}>
                    <td>{rep.reparasjons_id}</td>
                    <td>{rep.sykkel_id}</td>
                    <td>
                      {/* formaterer riktig dato-oppsett */}
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
                      {/* link med en knapp med sti til endre reparasjon */}
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

  // mounted()- funksjonen blir kalt når komponenten blir lagt til for visning 
  // kjører spørringen som ligger i classen repService med navn getReps 
  mounted() {
    repService.getReps(reps => {
      this.reps = reps;
    });
  }
}

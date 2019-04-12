// importerer component fra react-biblioteket. 
// brukes for å lage en GUI-applikasjon med React 
import * as React from 'react';
import { Component } from 'react-simplified'; // component er en klasse som brukes til å lage et nytt komponent 
import { NavLink } from 'react-router-dom';
import { fraktService } from './services'; // importerer fraktService fra services.js - classen spørringene hentes fra 
import { Card } from './widgets'; // card elementene hentes fra widgets.js filen, styling  
import Table from 'react-bootstrap/Table'; // bruker elementer fra bootstrap for styling   
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// FraktList er en subklasse av Component 
export default class FraktList extends Component {
  // definerer et tomt array 'frakter' 
  frakter = [];

    render() {
    return (
      // styling av sidens oppsett 
      <Row style={{ marginLeft: '2%', marginTop: '2%', marginRight: '2%', marginBottom: '2%' }}>
        <Col>
          <Card title="Oversikt over frakt">
            {/* lager en tabell med all fraktinformasjonen */}
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
                    {/* knapp i navlink som sender deg til 'legg til frakt' */}
                    <NavLink to={'/frakter/add'}>
                      <Button>Legg til ny</Button>
                    </NavLink>
                  </th>
                </tr>
              </thead>
              {/* går gjennom alle fraktene */} 
              {/* .map() funksjonen går gjennom alle elementene i en array i en rekkefølge */}
              {this.frakter.map(frakt => (
                <tbody>
                  {/* setter frakt_id som unik nøkkel */}
                  <tr key={frakt.frakt_id}>
                    <td>{frakt.type_sykkel}</td> {/* viser alle type sykler som første rad*/}
                    <td>{frakt.modell}</td> {/* viser tilsvarende modell i andre rad */}
                    <td>{frakt.sted_navn, frakt.fra_sted}</td>
                    <td>{frakt.sted_id, frakt.til_sted}</td>
                    <td>
                      {/* formaterer riktig dato-oppsett */}
                      {('0' + frakt.frakt_dato.getDate()).slice(-2) +
                        '.' +
                        ('0' + (frakt.frakt_dato.getMonth() + 1)).slice(-2) +
                        '.' +
                        frakt.frakt_dato.getFullYear()}
                    </td>
                    <td>{frakt.status}</td>

                    <td>
                      {/* link med en knapp med sti til endre frakt */}
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

  // mounted()- funksjonen blir kalt når komponenten blir lagt til for visning 
  // kjører spørringen som ligger i classen fraktService med navn getFrakter 
  mounted() {
    fraktService.getFrakter(frakter => {
      this.frakter = frakter;
    });
  }
}

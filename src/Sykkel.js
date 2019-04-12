// importerer component fra react-biblioteket. 
// brukes for å lage en GUI-applikasjon med React 
import * as React from 'react';
import { Component } from 'react-simplified'; // component er en klasse som brukes til å lage et nytt komponent 
import { NavLink } from 'react-router-dom';
import { sykkelService } from './services'; // importerer fraktService fra services.js - classen spørringene hentes fra
import { Card } from './widgets'; // card elementene hentes fra widgets.js filen, styling 
import Table from 'react-bootstrap/Table'; // bruker elementer fra bootstrap for styling  
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// SykkelList er en subklasse av Component
export default class SykkelList extends Component {
  // definerer et tomt array 'sykler'
  sykler = [];

  render() {
    return (
      <Row style={{ marginLeft: '2%', marginTop: '2%', marginRight: '2%', marginBottom: '2%' }}>
        <Col>
          <Card title="Sykler">
            <input type="text" id="sok" onChange={this.sokSykkel} placeholder="Søk..." />
            <br />
            <br />
            {/* lager en tabell med all kundeinformasjonen */}
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
                    {/* legg til ny sykkel */}
                    <NavLink to={'/sykler/add'}>
                      <Button>Legg til ny</Button>
                    </NavLink>
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* går gjennom alle syklene */} 
                {/* .map() funksjonen går gjennom alle elementene i en array i en rekkefølge */}
                 {/* setter sykkel_id som unik nøkkel */}
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

   /* Legger inn søk. sjekker hvis det ikke er skrevet noe i søkbaren,
     vis alle sykler,  ellers (hvis det er noe i søkbaren), 
      searchSykkel(fra services) med verdien fra søk.value */ 
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

    // mounted()- funksjonen blir kalt når komponenten blir lagt til for visning 
     
  mounted() {
    sykkelService.getBikes(sykler => {
      this.sykler = sykler;
    });
  }
}

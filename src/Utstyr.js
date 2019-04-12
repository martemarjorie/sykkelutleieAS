// importerer component fra react-biblioteket. 
// brukes for å lage en GUI-applikasjon med React 
import * as React from 'react';
import { Component } from 'react-simplified'; // component er en klasse som brukes til å lage et nytt komponent 
import { NavLink } from 'react-router-dom';
import { utstyrService } from './services'; // importerer fraktService fra services.js - classen spørringene hentes fra
import { Card } from './widgets'; // card elementene hentes fra widgets.js filen, styling 
import Table from 'react-bootstrap/Table'; // bruker elementer fra bootstrap for styling  
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// UtstyrList er en subklasse av Component
export default class UtstyrList extends Component {
  // definerer et tomt array 'utstyrer'
  utstyrer = [];

  render() {
    return (
      <Row style={{ marginLeft: '2%', marginTop: '2%', marginRight: '2%', marginBottom: '2%' }}>
        <Col>
          <Card title="Utstyrsliste">
            <input type="text" id="sok" onChange={this.sokUtstyr} placeholder="Søk.." />
            <br />
            <br />
            {/* lager en tabell med all utstyrinfo */}
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Type utstyr</th>
                  <th>Beskrivelse</th>
                  <th>Pris</th>
                  <th>
                    {/* legg til nytt utstyr */}
                    <NavLink to={'/utstyrer/add'}>
                      <Button>Legg til ny</Button>
                    </NavLink>
                  </th>
                </tr>
              </thead>
              <tbody>
                 {/* går gjennom alt utstyr */} 
                {/* .map() funksjonen går gjennom alle elementene i en array i en rekkefølge */}
                 {/* setter sykkel_id som unik nøkkel */}
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

  /* Legger inn søk. sjekker hvis det ikke er skrevet noe i søkbaren,
     vis alt utstyr,  ellers (hvis det er noe i søkbaren), 
      searchUtstyr(fra services) med verdien fra søk.value */ 
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

  // mounted()- funksjonen blir kalt når komponenten blir lagt til for visning 
  mounted() {
    utstyrService.getUtstyrer(utstyrer => {
      this.utstyrer = utstyrer;
    });
  }
}

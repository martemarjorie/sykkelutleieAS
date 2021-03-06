// importerer component fra react-biblioteket. 
// brukes for å lage en GUI-applikasjon med React 
import * as React from 'react';
import { Component } from 'react-simplified'; // component er en klasse som brukes til å lage et nytt komponent 
import { NavLink } from 'react-router-dom';
import { bestillingerService, bestillingService } from './services'; // importerer bestillingerService og bestillingService fra services.js - classen spørringene hentes fra 
import { Card } from './widgets'; // card elementene hentes fra widgets.js filen, styling  
import Table from 'react-bootstrap/Table'; // elementene hentes fra bootstrap, styling  
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// Importerer biblioteker 

// BestillingList er en subklasse av Component 
export default class BestillingsList extends Component {
  // definerer et tomt array 'bestillinger'  
  bestillinger = []; 

  render() {
    return (
      // styling av sidens oppsett  
      <Row style={{ marginLeft: '2%', marginTop: '2%', marginRight: '2%', marginBottom: '2%' }}>
        <Col>
          <Card title="Bestillingsoversikt">
        {/* Legger inn søk */}
            <input type="text" id="sok" onChange={this.sokBestilling} placeholder="Søk..." /> {/* kaller funksjonen sokBestilling  */}
            <br />
            <br />
            {/* lager en tabell med all bestillingsinfo */}
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
                  {/* link med knapp til å legge til ny bestilling */}
                    <NavLink to={'/nybestilling'}>
                      <Button>Legg til ny</Button>
                    </NavLink>
                  </th>
                </tr>
              </thead>

              {/* Gjør at for hver bestilling i bestillinger, så skal */}
              {/* det legges inn info i nye rader */}
              {this.bestillinger.map(bestilling => (
                <tbody>
                   {/* setter bestilling_id som unik nøkkel */}
                  <tr key={bestilling.bestilling_id}>
                    {/* setter alle verdiene lagret i databasen i tabellen */}
                    <td>{bestilling.bestilling_id}</td>
                    <td>{bestilling.fornavn}</td>
                    <td>{bestilling.tlf}</td>
                    <td>{bestilling.type_sykkel}</td>
                    <td>{bestilling.modell}</td>
                    <td>
                      {bestilling.type_utstyr}
                    </td>
                    {/* formaterer dato riktig for ut- og innleveringer */}
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
                    {/* this.delete når man klikker på knappen, */}
                    {/* som kjører delete-funksjonen*/}
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

// mounted()-funksjonen blir kalt når komponenten blir lagt til for visning 
// kjører spørringen som ligger i classen bestillingerService med navn getBestillinger 
  mounted() {
    bestillingerService.getBestillinger(bestillinger => {
      this.bestillinger = bestillinger;
    });
  }

  // Legger inn søk. sjekker hvis det ikke er skrevet noe i søkbaren,
  // vis alle bestillinger,  ellers (hvis det er noe i søkbaren), 
  // searchBestillinger(fra services) med verdien fra søk.value 
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

// slettefunksjon som deklarerer alt som skal inn i slettBestilling 
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
        history.push('/bestillinger'); // oppdaterer 'bestillinger' siden, pusher spørringen i 'bestillinger 
      }
    );
    this.props.history.replace('/'); // tar deg til hjemsiden når man trykker på slett 
  }
}

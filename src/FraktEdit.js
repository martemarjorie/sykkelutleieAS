// importerer component fra react-biblioteket. 
// brukes for å lage en GUI-applikasjon med React 
import * as React from 'react';
import { Component } from 'react-simplified'; // component er en klasse som brukes til å lage et nytt komponent 
import { fraktService, stedService } from './services'; // importerer fra services.js - classen spørringene hentes fra 
import { Card } from './widgets'; // card elementene hentes fra widgets.js filen, styling  
import Form from 'react-bootstrap/Form'; // elementene hentes fra bootstrap, styling  
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

// FraktEdit er en subklasse av Component 
export default class FraktEdit extends Component {
  steder = []; //Hentes fra database
  fra_sted = '';
  til_sted = '';
  frakt_dato = '';
  statuser = ['Klar for henting', 'Levert'];
  status = '';
  type_sykkel = '';
  modell = '';

  render() {
    return (
       // styling av sidens oppsett  
      <Container style={{ width: '50%', marginTop: '3%', marginBottom: '3%' }}>
        <Card title="Endre fraktinformasjon">
          <Form>
            {/* hva en kan endre på */}
            {/* verdien som allerede er lagt inn vil vises */}
            <Form.Group>
              <Form.Label>Dato</Form.Label>
              <Form.Control
                id="fraktdato"
                type="date"
                defaultValue={this.frakt_dato}
                onChange={e => (this.frakt_dato = e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" value={this.status} selected onChange={e => (this.status = e.target.value)}>
                <option value={this.statuser[0]}>{this.statuser[0]}</option>
                <option value={this.statuser[1]}>{this.statuser[1]}</option>
              </Form.Control>
            </Form.Group>
          </Form>
          {/* knapp med save funksjon */}
          <Button style={{ width: '67%' }} type="button" variant="outline-success" onClick={this.save}>
            Lagre
          </Button>
        </Card>
      </Container>
    );
  }


  mounted() {
    // definerer alle mnd i variabler 
    let mnd = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let dato = 0;
    
    // henter spørringen og definerer hva som skal endres 
    fraktService.getFrakt(this.props.match.params.frakt_id, frakt => {
      console.log(frakt.frakt_dato);
      // dato oppsettet må gjøres om til riktig format 
      this.frakt_dato = frakt.frakt_dato
        .toString()
        .substr(4, 11)
        .split(' ');
      console.log(this.frakt_dato);

      this.status = frakt.status;
    });
    // henter spørringen fra classen stedService under getSteder 
    stedService.getSteder(steder => {
      this.steder = steder;
    });
    setTimeout(() => {
      // funksjonen som formaterer datoen fra databasen slik at den matcher sidens formatering
      dato = `0${1 + mnd.indexOf(this.frakt_dato[0])}`;
      this.frakt_dato = `${this.frakt_dato[2]}-${dato}-${this.frakt_dato[1]}`;

      console.log(this.frakt_dato);

      // henter id fraktdato og gir den ny verdi
      document.getElementById('fraktdato').value = this.frakt_dato;
    }, 500);
  }

  // lagre funksjon, henter updateFrakt 
  save() {
    fraktService.updateFrakt(
      this.props.match.params.frakt_id,
      this.frakt_dato,
      this.status,

      () => {
        history.push('/frakter'); // pusher lagringene inn i oversikten 
      }
    );
    this.props.history.replace('/'); // hjemsiden kommer opp når det lagres 
  }
}

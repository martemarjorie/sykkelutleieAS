// importerer component fra react-biblioteket. 
// brukes for å lage en GUI-applikasjon med React 
import * as React from 'react';
import { Component } from 'react-simplified'; // component er en klasse som brukes til å lage et nytt komponent 
import { repService } from './services'; // importerer fra services.js - classen spørringene hentes fra 
import { Card } from './widgets'; // card elementene hentes fra widgets.js filen, styling  
import Form from 'react-bootstrap/Form'; // elementene hentes fra bootstrap, styling  
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

// RepEdit er en subklasse av Component
export default class RepEdit extends Component {
  // definerer variabler
  repinnlev_dato = '';
  reputlev_dato = '';
  rep_beskrivelse = '';

  render() {
    return (
      //styling
      <Container style={{ width: '50%', marginTop: '3%', marginBottom: '3%' }}>
        <Card title="Endre status på reparasjon">
          <Form>
             {/* hva en kan endre på */}
            {/* verdien som allerede er lagt inn vil vises */}
            <Form.Group>
              <Form.Label>Innleveringsdato</Form.Label>
              <Form.Control
                id="repinnlevDato"
                type="date"
                defaultValue={this.repinnlev_dato}
                onChange={e => (this.repinnlev_dato = e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Utleveringsdato</Form.Label>
              <Form.Control
                id="reputlevDato"
                type="date"
                defaultValue={this.reputlev_dato}
                onChange={e => (this.reputlev_dato = e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Beskrivelse</Form.Label>
              <Form.Control
                as="input"
                defaultValue={this.rep_beskrivelse}
                onChange={e => (this.rep_beskrivelse = e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button style={{ width: '67%' }} type="button" variant="outline-success" onClick={this.save}>
            Lagre
          </Button>

          <Button
            style={{ width: '30%', marginLeft: '3%' }}
            type="button"
            variant="outline-danger"
            onClick={this.delete}
          >
            Slett
          </Button>
        </Card>
      </Container>
    );
  }

  mounted() {
    // definerer alle mnd i variabler 
    let mnd = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let dato1 = 0;
    let dato2 = 0;

    // henter spørringen og definerer hva som skal endres
    repService.getRep(this.props.match.params.reparasjons_id, rep => {
      console.log(rep.repinnlev_dato);
      // dato oppsettet må gjøres om til riktig format
      this.repinnlev_dato = rep.repinnlev_dato
        .toString()
        .substr(4, 11)
        .split(' ');
      console.log(this.repinnlev_dato);

      console.log(rep.reputlev_dato);
      this.reputlev_dato = rep.reputlev_dato
        .toString()
        .substr(4, 11)
        .split(' ');
      console.log(this.reputlev_dato);

      this.rep_beskrivelse = rep.rep_beskrivelse;
    });

    setTimeout(() => {
      // Funksjonen som formaterer datoen fra databasen slik at den matcher sidens formatering.

      dato1 = `0${1 + mnd.indexOf(this.repinnlev_dato[0])}`;
      this.repinnlev_dato = `${this.repinnlev_dato[2]}-${dato1}-${this.repinnlev_dato[1]}`;

      console.log(this.repinnlev_dato);
      
      // henter id repinnlevDato og gir den ny verdi
      document.getElementById('repinnlevDato').value = this.repinnlev_dato;
    }, 500);

    setTimeout(() => {
      // funksjonen som formaterer datoen fra databasen slik at den matcher sidens formatering.

      dato2 = `0${1 + mnd.indexOf(this.reputlev_dato[0])}`;
      this.reputlev_dato = `${this.reputlev_dato[2]}-${dato2}-${this.reputlev_dato[1]}`;

      console.log(this.reputlev_dato);

      document.getElementById('reputlevDato').value = this.reputlev_dato;
    }, 500);
  }

  // lagre funksjon, henter updateRep
  save() {
    repService.updateRep(
      this.props.match.params.reparasjons_id,
      this.repinnlev_dato,
      this.reputlev_dato,
      this.rep_beskrivelse,

      () => {
        history.push('/reps');
      }
    );
    this.props.history.replace('/reps/');
  }

  // slett funksjon
  delete() {
    repService.deleteRep(
      this.props.match.params.reparasjons_id,
      this.sykkel_id,
      this.repinnlev_dato,
      this.reputlev_dato,
      this.rep_beskrivelse,
      () => {
        history.push('/reps');
      }
    );
    this.props.history.replace('/reps/');
  }
}

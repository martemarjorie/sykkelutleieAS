// importerer component fra react-biblioteket. 
// brukes for å lage en GUI-applikasjon med React 
import * as React from 'react';
import { Component } from 'react-simplified'; // component er en klasse som brukes til å lage et nytt komponent 
import { repService, sykkelService } from './services'; // importerer fraktService fra services.js - classen spørringene hentes fra 
import { Card } from './widgets'; // card elementene hentes fra widgets.js filen, styling  
import Form from 'react-bootstrap/Form'; // bruker elementer fra bootstrap for styling   
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

// RepAdd er en subklasse av Component 
export default class RepAdd extends Component {
  // definerer variabel og et tomt array
  sykkel_id = '';
  sykler = [];

  render() {
    return (
      // style
      <Container style={{ width: '50%', marginTop: '3%' }}>
        <Card title="Legg til reparasjon">
          <Form>
            {/* alle disse fylles ut når man oppretter en reparasjon */}
            <Form.Group controlId="sykkel">
              <Form.Label>Velg sykkel</Form.Label>
              <Form.Control
                as="select"
                value={this.sykkel_id}
                onChange={e => {
                  this.sykkel_id = e.target.value;
                }}
                title="Velg sykkel"
              >
                <option value="no-val" selected disabled hidden>
                  -Ingen valgt sykkel-
                </option>
                {this.sykler.map(sykkel => (
                  <option value={sykkel.sykkel_id}>
                    {sykkel.sykkel_id}, {sykkel.type_sykkel} {sykkel.modell}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

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
          {/* legg til knapp som refererer til add funksjonen */}
          <Button type="submit" variant="primary" onClick={this.add}>
            Legg til
          </Button>
        </Card>
      </Container>
    );
  }

  // mounted()-funksjonen blir kalt når komponenten blir lagt til for visning 
  // kjører spørringen som ligger i classen sykkelService med navn getSykler  
  mounted() {
    sykkelService.getSykler(sykler => {
      this.sykler = sykler;
    });
  }

  // funksjonen add, som legger til de gitte opplysningene inn i kundeoversikten  
  // repService viser til hvilken class fra Service spørringen gjøres i   
  // addRep refererer til hvilken spørring som skal utføres  
  add() {
    repService.addRep(
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

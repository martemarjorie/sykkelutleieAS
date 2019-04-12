// importerer component fra react-biblioteket 
// brukes for å lage en GUI-applikasjon med React
import * as React from 'react';
import { Component } from 'react-simplified'; // component er en klasse som brukes til å lage et nytt komponent 
import { fraktService, sykkelService, stedService } from './services'; // importerer fraktService, sykkelService og stedService 
import { Card } from './widgets';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

// FraktAdd er en subklasse av Component 
export default class FraktAdd extends Component {
 // definerer variabler *
  sykkel_id = '';
  sykler = [];
  frakter = [];
  steder = [];
  statuser = ['Klar for henting', 'Levert'];

  render() {
    return (
      <Container style={{ width: '50%', marginTop: '3%' }}>
        <Card title="Legg til frakt">
          <Form>
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
                {/* går gjennom alle syklene */}
                {/* .map() funksjonen går gjennom alle elementene i en array i rekkefølge */}
                {this.sykler.map(sykkel => (
                  <option value={sykkel.sykkel_id}>
                    {sykkel.type_sykkel} {sykkel.modell} {/* viser sykkeltype og modell fra 'sykkel'-arrayet */}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="fraSted">
              <Form.Label>Velg fra sted</Form.Label>
              <Form.Control
                as="select"
                value={this.fra_sted}
                onChange={e => {
                  this.fra_sted = e.target.value;
                }}
                title="Velg til sted"
              >
                <option value="no-val" selected disabled hidden>
                  -Ikke valgt sted-
                </option>
                {/* går gjennom alle stedene */}
                {this.steder.map(sted => (
                  <option value={sted.sted_id}>{sted.sted_navn}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="tilSted">
              <Form.Label>Velg til sted</Form.Label>
              <Form.Control
                as="select"
                value={this.til_sted}
                onChange={e => {
                  this.til_sted = e.target.value;
                }}
                title="Velg til sted"
              >
                {/* et forhåndsvalg en ikke kan velge */}
                <option value="no-val" selected disabled hidden>
                  -Ikke valgt sted-
                </option>
                {/* går gjennom alle stedene */}
                {this.steder.map(sted => (
                  <option value={sted.sted_id}>{sted.sted_navn}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Dato</Form.Label>
              <Form.Control
                id="fraktDato"
                type="date"
                defaultValue={this.frakt_dato}
                onChange={e => (this.frakt_dato = e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" value={this.status} selected onChange={e => (this.status = e.target.value)}>
                <option value={this.statuser[0]}>{this.statuser[0]}</option> {/* statuser[0] = 'klar for henting' */}
                <option value={this.statuser[1]}>{this.statuser[1]}</option> {/* statuser[1] = 'levert' */}
              </Form.Control>
            </Form.Group>
          </Form>
          <Button type="submit" variant="primary" onClick={this.add}>
            Legg til
          </Button>
        </Card>
      </Container>
    );
  }

  // mounted()-funksjonen blir kalt når komponenten blir lagt til for visning 
  // kjører spørringen som ligger i classen sykkelService med navn getSykler 
  // og stedService med getSteder 
  mounted() {
    sykkelService.getSykler(sykler => {
      this.sykler = sykler;
    });

    stedService.getSteder(steder => {
      this.steder = steder;
    });
  }

// funksjonen add, som legger til de gitte opplysningene inn i fraktoversikten  
  // fraktService viser til hvilken class fra Service spørringen gjøres i   
  // addFrakt refererer til hvilken spørring som skal utføres  
  add() {
    fraktService.addFrakt( 
      this.props.match.params.frakt_id,
      this.sykkel_id,
      this.fra_sted,
      this.til_sted,
      this.frakt_dato,
      this.status,
      () => {
        history.push('/frakter'); // legger (pusher) all informasjonen i fraktoversikten   
      }
    );
    this.props.history.replace('/'); // brukeren kommer til hjemsiden når 'legg til' trykkes på  
  }
}

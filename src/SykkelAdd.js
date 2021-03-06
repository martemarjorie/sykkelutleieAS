// importerer component fra react-biblioteket. 
// brukes for å lage en GUI-applikasjon med React 
import * as React from 'react';
import { Component } from 'react-simplified'; // component er en klasse som brukes til å lage et nytt komponent 
import { sykkelService, stedService } from './services'; // importerer fraktService fra services.js - classen spørringene hentes fra
import { Card } from './widgets'; // card elementene hentes fra widgets.js filen, styling  
import Form from 'react-bootstrap/Form'; // bruker elementer fra bootstrap for styling 
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

// SykkelAdd er en subklasse av Component
export default class SykkelAdd extends Component {
  //definerer variabler og arrays
  sykkeltyper = ['Tandem', 'Racer', 'Downhill', 'Barnesykkel']; //Begrenser valgene til disse
  ramme = '';
  hjul_storrelse = '';
  girsystem = '';
  timepris = '';
  dagspris = '';
  steder = []; //Hentes fra database
  tilhorer_sted = '';
  modell = '';
  type_sykkel = '';

  render() {
    return (
      <Container style={{ width: '50%', marginTop: '3%' }}>
        <Card title="Legg til sykkel">
          <Form>
            {/* alle disse fylles ut når man oppretter en sykkel */}
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control as="select" onChange={e => (this.type_sykkel = e.target.value)}>
                <option value="" />
                <option value={this.sykkeltyper[0]}>{this.sykkeltyper[0]}</option> {/* refererer til arrayet */}
                <option value={this.sykkeltyper[1]}>{this.sykkeltyper[1]}</option>
                <option value={this.sykkeltyper[2]}>{this.sykkeltyper[2]}</option>
                <option value={this.sykkeltyper[3]}>{this.sykkeltyper[3]}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Modell</Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                value={this.modell}
                onChange={event => (this.modell = event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ramme</Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                value={this.ramme}
                onChange={event => (this.ramme = event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Hjulstørrelse</Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                value={this.hjul_storrelse}
                onChange={event => (this.hjul_storrelse = event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Girsystem</Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                value={this.girsystem}
                onChange={event => (this.girsystem = event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Timepris</Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                value={this.timepris}
                onChange={event => (this.timepris = event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Dagspris</Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                value={this.dagspris}
                onChange={event => (this.dagspris = event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tilhører sted</Form.Label>
              <Form.Control
                as="select"
                selected
                value={this.tilhorer_sted}
                onChange={e => (this.tilhorer_sted = e.target.value)}
              >
                <option defaultValue={this.tilhorer_sted} />
                {this.steder.map(sted => <option value={sted.sted_id}>{sted.sted_navn}</option>)}
              </Form.Control>
            </Form.Group>
          </Form>
          <Button type="button" variant="primary" onClick={this.add}>
            Legg til
          </Button>
        </Card>
      </Container>
    );
  }

  mounted() {
    stedService.getSteder(steder => {
      this.steder = steder;
    });
  }

  // funksjonen add, som legger til de gitte opplysningene inn i kundeoversikten  
  // sykkelService viser til hvilken class fra Service spørringen gjøres i   
  // addSykkel refererer til hvilken spørring som skal utføres  
  add() {
    sykkelService.addSykkel(
      this.props.match.params.sykkel_id,
      this.type_sykkel,
      this.ramme,
      this.hjul_storrelse,
      this.girsystem,
      this.timepris,
      this.dagspris,
      this.tilhorer_sted,
      this.modell,
      () => {
        history.push('/sykler');
      }
    );
    this.props.history.replace('/');
  }
}

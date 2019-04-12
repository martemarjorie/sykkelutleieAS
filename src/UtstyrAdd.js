// importerer component fra react-biblioteket. 
// brukes for å lage en GUI-applikasjon med React 
import * as React from 'react';
import { Component } from 'react-simplified'; // component er en klasse som brukes til å lage et nytt komponent 
import { utstyrService } from './services'; // importerer fraktService fra services.js - classen spørringene hentes fra
import { Card } from './widgets'; // card elementene hentes fra widgets.js filen, styling  
import Form from 'react-bootstrap/Form'; // bruker elementer fra bootstrap for styling 
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

// UtstyrAdd er en subklasse av Component
export default class UtstyrAdd extends Component {
  // definerer variabler og arrays
  utstyrtyper = ['Gel sete', 'Henger', 'Hjelm', 'Sykkelveske', 'Lappesaker'];
  type_utstyr = '';
  beskrivelse = '';
  pris = '';

  render() {
    return (
      <Container style={{ width: '50%', marginTop: '3%' }}>
        <Card title="Legg til utstyr">
          <Form>
            {/* alle disse fylles ut når man oppretter et utstyr */}
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                value={this.type_utstyr}
                selected
                onChange={e => (this.type_utstyr = e.target.value)}
              >
                <option value="" />
                <option value={this.utstyrtyper[0]}>{this.utstyrtyper[0]}</option> {/* Gel sete */}
                <option value={this.utstyrtyper[1]}>{this.utstyrtyper[1]}</option>
                <option value={this.utstyrtyper[2]}>{this.utstyrtyper[2]}</option>
                <option value={this.utstyrtyper[3]}>{this.utstyrtyper[3]}</option>
                <option value={this.utstyrtyper[4]}>{this.utstyrtyper[4]}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Beskrivelse</Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                value={this.beskrivelse}
                onChange={event => (this.beskrivelse = event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Dagspris</Form.Label>
              <Form.Control
                type="number"
                rows="1"
                value={this.pris}
                onChange={event => (this.pris = event.target.value)}
              />
            </Form.Group>
          </Form>
          <Button type="button" variant="primary" onClick={this.add}>
            Legg til
          </Button>
        </Card>
      </Container>
    );
  }

  // funksjonen add, som legger til de gitte opplysningene inn i kundeoversikten  
  add() {
    utstyrService.addUtstyr(this.props.match.params.utstyr_id, this.type_utstyr, this.beskrivelse, this.pris, () => {
      history.push('/utstyrer');
    });
    this.props.history.replace('/');
  }
}

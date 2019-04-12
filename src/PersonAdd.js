// importerer component fra react-biblioteket. 
// brukes for å lage en GUI-applikasjon med React 
import * as React from 'react';
import { Component } from 'react-simplified'; // component er en klasse som brukes til å lage et nytt komponent 
import { personService } from './services'; // importerer fraktService fra services.js - classen spørringene hentes fra 
import { Card } from './widgets'; // card elementene hentes fra widgets.js filen, styling  
import Button from 'react-bootstrap/Button'; // bruker elementer fra bootstrap for styling   

// PersonAdd er en subklasse av Component 
export default class PersonAdd extends Component {
  // definerer variabler 
  fornavn = '';
  etternavn = '';
  tlf = '';
  epost = '';

  render() {
    return (
      <Container style={{ width: '50%', marginTop: '3%' }}>
        <Card title="Legg til ny kunde">
        {/* alle disse fylles ut når man oppretter en kunde */}
          <Form>
            <Form.Group>
              <Form.Label>Fornavn</Form.Label>
              <Form.Control
                as="textarea"
                required
                rows="1"
                value={this.fornavn}
                onChange={event => (this.fornavn = event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Etternavn</Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                required
                value={this.etternavn}
                onChange={event => (this.etternavn = event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tlf</Form.Label>
              <Form.Control
                type="number"
                isI
                rows="1"
                required
                value={this.tlf}
                onChange={event => (this.tlf = event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Epost</Form.Label>
              <Form.Control
                type="email"
                rows="1"
                required
                placeholder="eksempel@gmail.com"
                value={this.epost}
                onChange={event => (this.epost = event.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form>
          {/* legg til knapp som refererer til add funksjonen */}
          <Button variant="primary" onClick={this.add}>
            Legg til
          </Button>
        </Card>
      </Container>
    );
  }

  // funksjonen add, som legger til de gitte opplysningene inn i kundeoversikten  
  // personService viser til hvilken class fra Service spørringen gjøres i   
  // addPerson refererer til hvilken spørring som skal utføres  
  add() {
    personService.addPerson(
      this.props.match.params.person_id,
      this.fornavn,
      this.etternavn,
      this.tlf,
      this.epost,
      () => {
        history.push('/persons'); //pusher all informasjonen til kundelista
      }
    );
    this.props.history.replace('/'); // brukeren kommer til hjemsiden når 'legg til' trykkes på  
  }
}

// importerer component fra react-biblioteket. 
// brukes for å lage en GUI-applikasjon med React 
import * as React from 'react';
import { Component } from 'react-simplified'; // component er en klasse som brukes til å lage et nytt komponent 
import { personService } from './services'; // importerer fra services.js - classen spørringene hentes fra 
import { Card } from './widgets'; // card elementene hentes fra widgets.js filen, styling  
import Form from 'react-bootstrap/Form'; // elementene hentes fra bootstrap, styling  
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

// PersonEdit er en subklasse av Component 
export default class PersonEdit extends Component {
  // definerer variabler
  fornavn = '';
  etternavn = '';
  tlf = '';
  epost = '';

  render() {
    return (
      // styling
      <Container style={{ width: '50%', marginTop: '3%' }}>
        <Card title="Endre kunde">
          <Form>
            {/* hva en kan endre på */}
            {/* verdien som allerede er lagt inn vil vises */}
            <Form.Group>
              <Form.Label>Fornavn</Form.Label>
              <Form.Control
                as="textarea"
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
                value={this.etternavn}
                onChange={event => (this.etternavn = event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tlf</Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                value={this.tlf}
                onChange={event => (this.tlf = event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Epost</Form.Label>
              <Form.Control
                type="email"
                rows="1"
                value={this.epost}
                onChange={event => (this.epost = event.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Form>
          {/* knapp med save funksjon */}
          <Button style={{ width: '67%' }} type="button" variant="outline-success" onClick={this.save}>
            Lagre
          </Button>
            {/* knapp med delete funksjon */}
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

  // mounted()-funksjonen blir kalt når komponenten blir lagt til for visning 
// kjører spørringen som ligger i classen personService med navn getPerson 
  mounted() {
    personService.getPerson(this.props.match.params.person_id, person => {
      this.fornavn = person.fornavn;
      this.etternavn = person.etternavn;
      this.tlf = person.tlf;
      this.epost = person.epost;
    });
  }

  // lagre funksjon, henter updatePerson 
  save() {
    personService.updatePerson(
      this.props.match.params.person_id,
      this.fornavn,
      this.etternavn,
      this.tlf,
      this.epost,
      () => {
        history.push('/persons'); // pusher lagringene inn i oversikten 
      }
    );
    this.props.history.replace('/persons/'); // hjemsiden kommer opp når det lagres 
  }

  // slett funksjon, henter deletePerson
  delete() {
    personService.deletePerson(
      this.props.match.params.person_id,
      this.fornavn,
      this.etternavn,
      this.tlf,
      this.epost,
      () => {
        history.push('/persons');
      }
    );
    this.props.history.replace('/');
  }
}

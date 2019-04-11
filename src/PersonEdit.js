import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { personService } from './services';
import { Card, Row, Column, NavBar } from './widgets';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default class PersonEdit extends Component {
  fornavn = '';
  etternavn = '';
  tlf = '';
  epost = '';

  render() {
    return (
      <Container style={{ width: '50%', marginTop: '3%' }}>
        <Card title="Endre kunde">
          <Form>
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
    personService.getPerson(this.props.match.params.person_id, person => {
      this.fornavn = person.fornavn;
      this.etternavn = person.etternavn;
      this.tlf = person.tlf;
      this.epost = person.epost;
    });
  }

  save() {
    personService.updatePerson(
      this.props.match.params.person_id,
      this.fornavn,
      this.etternavn,
      this.tlf,
      this.epost,
      () => {
        history.push('/persons');
      }
    );
    this.props.history.replace('/persons/');
  }

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

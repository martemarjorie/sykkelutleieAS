import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { personService } from './services';
import { Card, Row, Column, NavBar } from './widgets';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default class PersonAdd extends Component {
  fornavn = '';
  etternavn = '';
  tlf = '';
  epost = '';

  render() {
    return (
      <Container style={{ width: '50%', marginTop: '3%' }}>
        <Card title="Legg til ny kunde">
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
          <Button variant="primary" onClick={this.add}>
            Legg til
          </Button>
        </Card>
      </Container>
    );
  }

  add() {
    personService.addPerson(
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
}

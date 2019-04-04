import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { personService, sykkelService, stedService, bestillingService } from './services';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import Container from 'react-bootstrap/Container';

export default class NyBestiling extends Component {
  // Values from the database
  sykler = [];
  persons = [];
  bestillinger = [];
  steder = [];

  utsted = ['-Ingen utlevering valgt-', 'Haugastøl', 'Finse'];

  // Form values
  valgt_kunde = '';
  valgt_sykkel = '';

  fradato = '';
  tildato = '';

  utleveringssted = '';
  innleveringssted = '';

  render() {
    return (
      <Container>
        <Form>
          <Form.Group controlId="kunde">
            <Form.Label>Velg kunde</Form.Label>
            <Form.Control
              as="select"
              value={this.person_id}
              onChange={e => (this.person_id = e.target.value)}
              title="Velg kunde"
            >
              <option value="no-val" selected disabled hidden>
                -Ingen valgt kunde-
              </option>
              {this.persons.map(person => (
                <option value={person.person_id}>
                  {person.fornavn} {person.etternavn}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="sykkel">
            <Form.Label>Velg sykkel</Form.Label>
            <Form.Control
              as="select"
              value={this.sykkel_id}
              onChange={e => (this.sykkel_id = e.target.value)}
              title="Velg sykkel"
            >
              <option value="no-val" selected disabled hidden>
                -Ingen valgt sykkel-
              </option>
              {this.sykler.map(sykkel => (
                <option value={sykkel.sykkel_id}>
                  {sykkel.type_sykkel}, {sykkel.modell}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Fra dato</Form.Label>
              <Form.Control type="date" value={this.fradato} onChange={e => (this.fradato = e.target.value)} />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Til dato</Form.Label>
              <Form.Control type="date" value={this.tildato} onChange={e => (this.tildato = e.target.value)} />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="utsted">
            <Form.Label>Velg utleveringssted</Form.Label>
            <Form.Control
              as="select"
              value={this.utleveringssted}
              onChange={e => (this.utleveringssted = e.target.value)}
            >
              <option value={this.utsted[0]}>{this.utsted[0]}</option>
              <option value={this.utsted[1]}>{this.utsted[1]}</option>
              <option value={this.utsted[1]}>{this.utsted[2]}</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="innsted">
            <Form.Label>Velg innleveringssted</Form.Label>
            <Form.Control
              as="select"
              value={this.innleveringssted}
              onChange={e => (this.innleveringssted = e.target.value)}
            >
              <option value="no-val" selected disabled hidden>
                -Ingen innlevering valgt-
              </option>
              {this.steder.map(sted => <option value={sted.sted_navn}>{sted.sted_navn}</option>)}
            </Form.Control>
          </Form.Group>
        </Form>
        <Button type="Button" onClick={this.SendBestilling}>
          Send bestilling
        </Button>
      </Container>
    );
  }

  mounted() {
    personService.getPersons(persons => {
      this.persons = persons;

      sykkelService.getSykler(sykler => {
        this.sykler = sykler;

        stedService.getSteder(steder => {
          this.steder = steder;
        });
      });
    });
  }

  SendBestilling() {
    let utlev_tidspunkt = this.fradato;
    let innlev_tidspunkt = this.tildato;
    let utlev_sted = this.utsted;
    let innlev_sted = this.innleveringssted;

    bestillingService.addBestilling(
      this.props.match.params.bestilling_id,
      this.person_id,
      this.utlev_tidspunkt,
      this.innlev_tidspunkt,
      this.utlev_sted,
      this.innlev_sted,
      () => {
        history.push('/bestillinger');
      }
    );
  }
}

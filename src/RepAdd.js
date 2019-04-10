import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { repService, sykkelService } from './services';
import { Card, Row, Column, NavBar } from './widgets';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default class RepAdd extends Component {
  sykkel_id = '';
  sykler = [];

  render() {
    return (
      <Container style={{ width: '50%', marginTop: '3%' }}>
        <Card title="Legg til reparasjon">
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
          <Button type="submit" variant="primary" onClick={this.add}>
            Legg til
          </Button>
        </Card>
      </Container>
    );
  }

  mounted() {
    sykkelService.getSykler(sykler => {
      this.sykler = sykler;
    });
  }

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

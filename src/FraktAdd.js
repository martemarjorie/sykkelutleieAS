import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { fraktService, sykkelService, stedService } from './services';
import { Card, Row, Column, NavBar } from './widgets';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default class FraktAdd extends Component {
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
                {this.sykler.map(sykkel => (
                  <option value={sykkel.sykkel_id}>
                    {sykkel.type_sykkel} {sykkel.modell}
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
                <option value="no-val" selected disabled hidden>
                  -Ikke valgt sted-
                </option>
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
                <option value={this.statuser[0]}>{this.statuser[0]}</option>
                <option value={this.statuser[1]}>{this.statuser[1]}</option>
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

  mounted() {
    sykkelService.getSykler(sykler => {
      this.sykler = sykler;
    });

    stedService.getSteder(steder => {
      this.steder = steder;
    });
  }

  add() {
    fraktService.addFrakt(
      this.props.match.params.frakt_id,
      this.sykkel_id,
      this.fra_sted,
      this.til_sted,
      this.frakt_dato,
      this.status,
      () => {
        history.push('/frakter');
      }
    );
    this.props.history.replace('/');
  }
}

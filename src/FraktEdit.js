import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { fraktService, stedService } from './services';
import { Card, Row, Column, NavBar } from './widgets';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default class FraktEdit extends Component {
  steder = []; //Hentes fra database
  fra_sted = '';
  til_sted = '';
  frakt_dato = '';
  statuser = ['Klar for henting', 'Levert'];
  status = '';
  type_sykkel = '';
  modell = '';

  render() {
    return (
      <Container style={{ width: '50%', marginTop: '3%', marginBottom: '3%' }}>
        <Card title="Endre fraktinformasjon">
          <Form>
            <Form.Group>
              <Form.Label>Dato</Form.Label>
              <Form.Control
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

  /*<Form.Control as="select" value={this.status} selected onChange={e => (this.status = e.target.value)}>
        <option value={this.statuser[0]}>{this.statuser[0]}</option>
        <option value={this.statuser[1]}>{this.statuser[1]}</option>*/

  mounted() {
    fraktService.getFrakt(this.props.match.params.frakt_id, frakt => {
      this.frakt_dato = frakt.frakt_dato;
      this.status = frakt.status;
    });

    stedService.getSteder(steder => {
      this.steder = steder;
    });
  }

  save() {
    fraktService.updateFrakt(
      this.props.match.params.frakt_id,
      this.frakt_dato,
      this.status,

      () => {
        history.push('/frakter');
      }
    );
    this.props.history.replace('/frakter/');
  }
}

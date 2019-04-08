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
  status = ['Klar for henting', 'Levert'];

  render() {
    return (
      <Container style={{ width: '50%', marginTop: '3%' }}>
        <Card title="Endre fraktinformasjon">
          <Form>
            <Form.Group>
              <Form.Label>Fra sted</Form.Label>
              <Form.Control as="select" value={this.fra_sted} onChange={e => (this.fra_sted = e.target.value)}>
                <option value={this.fra_sted} selected />
                {this.steder.map(sted => <option value={sted.sted_navn}>{sted.sted_navn}</option>)}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Til sted</Form.Label>
              <Form.Control as="select" value={this.til_sted} selected onChange={e => (this.til_sted = e.target.value)}>
                <option value={this.til_sted} selected />
                {this.steder.map(sted => <option value={sted.sted_navn}>{sted.sted_navn}</option>)}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Frakt dato</Form.Label>
              <Form.Control type="date" value={this.frakt_dato} onChange={e => (this.frakt_dato = e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control as="select" value={this.staus} selected onChange={e => (this.status = e.target.value)}>
                <option value={this.status[0]}>{this.status[0]}</option>
                <option value={this.status[1]}>{this.status[1]}</option>
              </Form.Control>
            </Form.Group>
          </Form>
          <Button type="button" variant="primary" onClick={this.save}>
            Lagre
          </Button>

          <Button type="button" variant="danger" onClick={this.delete}>
            Slett
          </Button>
        </Card>
      </Container>
    );
  }

  mounted() {
    fraktService.getFrakter(this.props.match.params.frakt_id, frakt => {
      this.fra_sted = frakt.fra_sted;
      this.til_sted = frakt.til_sted;
      this.fra_dato = frakt.fra_dato;
      this.status = frakt.status;
    });

    stedService.getSteder(steder => {
      this.steder = steder;
    });
  }

  save() {
    fraktService.updateFrakt(
      this.props.match.params.frakt_id,
      this.type_sykkel,
      this.modell,
      this.fra_sted,
      this.til_sted,
      this.fra_dato,
      this.status,
      () => {
        history.push('/frakter');
      }
    );
  }

  delete() {
    fraktService.deleteFrakt(
      this.props.match.params.frakt_id,
      this.type_sykkel,
      this.modell,
      this.fra_sted,
      this.til_sted,
      this.fra_dato,
      this.status,
      () => {
        history.push('/frakter');
      }
    );
  }
}

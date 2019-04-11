import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { sykkelService, stedService } from './services';
import { Card, Row, Column, NavBar } from './widgets';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default class SykkelEdit extends Component {
  sykkeltyper = ['Tandem', 'Racer', 'Downhill', 'Barnesykkel']; //Begrenser valgene til disse
  ramme = '';
  hjul_storrelse = '';
  girsystem = '';
  timepris = '';
  dagspris = '';
  steder = []; //Hentes fra database
  tilhorer_sted = '';
  modell = '';
  type_sykkel = '';

  render() {
    return (
      <Container style={{ width: '50%', marginTop: '3%', marginBottom: '3%' }}>
        <Card title="Endre sykkel">
          <Form>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                value={this.type_sykkel}
                selected
                onChange={e => (this.type_sykkel = e.target.value)}
              >
                <option value={this.sykkeltyper[0]}>{this.sykkeltyper[0]}</option>
                <option value={this.sykkeltyper[1]}>{this.sykkeltyper[1]}</option>
                <option value={this.sykkeltyper[2]}>{this.sykkeltyper[2]}</option>
                <option value={this.sykkeltyper[3]}>{this.sykkeltyper[3]}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Modell</Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                value={this.modell}
                onChange={event => (this.modell = event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Ramme</Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                value={this.ramme}
                onChange={event => (this.ramme = event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Hjulstørrelse</Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                value={this.hjul_storrelse}
                onChange={event => (this.hjul_storrelse = event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Girsystem</Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                value={this.girsystem}
                onChange={event => (this.girsystem = event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Timepris</Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                value={this.timepris}
                onChange={event => (this.timepris = event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Dagspris</Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                value={this.dagspris}
                onChange={event => (this.dagspris = event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tilhører sted</Form.Label>
              <Form.Control
                as="select"
                selected
                value={this.tilhorer_sted}
                onChange={e => (this.tilhorer_sted = e.target.value)}
              >
                <option defaultValue={this.tilhorer_sted} />
                {this.steder.map(sted => <option value={sted.sted_id}>{sted.sted_navn}</option>)}
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

  mounted() {
    sykkelService.getSykkel(this.props.match.params.sykkel_id, sykkel => {
      this.type_sykkel = sykkel.type_sykkel;
      this.ramme = sykkel.ramme;
      this.hjul_storrelse = sykkel.hjul_storrelse;
      this.girsystem = sykkel.girsystem;
      this.timepris = sykkel.timepris;
      this.dagspris = sykkel.dagspris;
      this.tilhorer_sted = sykkel.tilhorer_sted;
      this.modell = sykkel.modell;
    });

    stedService.getSteder(steder => {
      this.steder = steder;
    });
  }

  save() {
    sykkelService.updateSykkel(
      this.props.match.params.sykkel_id,
      this.type_sykkel,
      this.ramme,
      this.hjul_storrelse,
      this.girsystem,
      this.timepris,
      this.dagspris,
      this.tilhorer_sted,
      this.modell,

      () => {
        history.push('/sykler');
      }
    );
    this.props.history.replace('/sykler/');
  }

  delete() {
    sykkelService.deleteSykkel(
      this.props.match.params.sykkel_id,
      this.type_sykkel,
      this.ramme,
      this.hjul_storrelse,
      this.girsystem,
      this.timepris,
      this.dagspris,
      this.sted_navn,
      this.modell,
      () => {
        history.push('/sykler');
      }
    );
    this.props.history.replace('/');
  }
}

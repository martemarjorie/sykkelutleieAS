import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { utstyrService } from './services';
import { Card, Row, Column, NavBar } from './widgets';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default class UtstyrEdit extends Component {
  utstyrtyper = ['Gel sete', 'Henger', 'Hjelm', 'Sykkelveske'];
  type_utstyr = '';
  beskrivelse = '';
  pris = '';

  render() {
    return (
      <Container style={{ width: '50%', marginTop: '3%' }}>
        <Card title="Endre utstyr">
          <Form>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control
                as="select"
                value={this.type_utstyr}
                selected
                onChange={e => (this.type_utstyr = e.target.value)}
              >
                <option value={this.utstyrtyper[0]}>{this.utstyrtyper[0]}</option>
                <option value={this.utstyrtyper[1]}>{this.utstyrtyper[1]}</option>
                <option value={this.utstyrtyper[2]}>{this.utstyrtyper[2]}</option>
                <option value={this.utstyrtyper[3]}>{this.utstyrtyper[3]}</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Beskrivelse</Form.Label>
              <Form.Control
                as="textarea"
                rows="1"
                value={this.beskrivelse}
                onChange={event => (this.beskrivelse = event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Dagspris</Form.Label>
              <Form.Control
                type="number"
                rows="1"
                value={this.pris}
                onChange={event => (this.pris = event.target.value)}
              />
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
    utstyrService.getUtstyr(this.props.match.params.utstyr_id, utstyr => {
      this.type_utstyr = utstyr.type_utstyr;
      this.beskrivelse = utstyr.beskrivelse;
      this.pris = utstyr.pris;
    });
  }

  save() {
    utstyrService.updateUtstyr(this.props.match.params.utstyr_id, this.type_utstyr, this.beskrivelse, this.pris, () => {
      history.push('/utstyrer');
    });
    this.props.history.replace('/utstyrer/');
  }

  delete() {
    utstyrService.deleteUtstyr(this.props.match.params.utstyr_id, this.type_utstyr, this.beskrivelse, this.pris, () => {
      history.push('/utstyrer');
    });
    this.props.history.replace('/');
  }
}

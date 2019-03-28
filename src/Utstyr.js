import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { utstyrService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';

export default class UtstyrList extends Component {
  utstyrer = [];

  render() {
    return (
      <Card title="Utstyrsliste">
        <Row>
          <Column>
            <h5>Type utstyr</h5>
          </Column>
          <Column>
            <h5>Beskrivelse</h5>
          </Column>
          <Column>
            <h5>Pris</h5>
          </Column>
        </Row>
        {this.utstyrer.map(utstyr => (
          <Row key={utstyr.utstyr_id}>
            <Column>
              <NavLink to={'/utstyrer/' + utstyr.type_utstyr + '/edit'}>{utstyr.type_utstyr}</NavLink>
            </Column>
            <Column>
              <NavLink to={'/utstyrer/' + utstyr.beskrivelse + '/edit'}>{utstyr.beskrivelse}</NavLink>
            </Column>
            <Column>
              <NavLink to={'/utstyrer/' + utstyr.pris + '/edit'}>{utstyr.pris}</NavLink>
            </Column>
          </Row>
        ))}
        <NavLink to={'/utstyrer/add'}>Legg til</NavLink>
      </Card>
    );
  }

  mounted() {
    utstyrService.getUtstyrer(utstyrer => {
      this.utstyrer = utstyrer;
    });
  }
}

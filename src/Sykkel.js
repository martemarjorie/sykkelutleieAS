import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { sykkelService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';

export default class SykkelList extends Component {
  sykler = [];

  render() {
    return (
      <Card title="Sykler">
        {this.sykler.map(sykkel => (
          <Row>
            <Column key={sykkel.sykkel_id}>
              <NavLink to={'/sykler/' + sykkel.sykkel_id + '/edit'}>{sykkel.type_sykkel}</NavLink>
            </Column>
            <Column>
              <NavLink to={'/sykler/' + sykkel.sykkel_id + '/edit'}>{sykkel.ramme}</NavLink>
            </Column>
            <Column>
              <NavLink to={'/sykler/' + sykkel.sykkel_id + '/edit'}>{sykkel.hjul_storrelse}</NavLink>
            </Column>
            <Column>
              <NavLink to={'/sykler/' + sykkel.sykkel_id + '/edit'}>{sykkel.girsystem}</NavLink>
            </Column>
            <Column>
              <NavLink to={'/sykler/' + sykkel.sykkel_id + '/edit'}>{sykkel.timepris}</NavLink>
            </Column>
            <Column>
              <NavLink to={'/sykler/' + sykkel.sykkel_id + '/edit'}>{sykkel.dagspris}</NavLink>
            </Column>
            <Column>
              <NavLink to={'/sykler/' + sykkel.sykkel_id + '/edit'}>{sykkel.tilhorer_sted}</NavLink>
            </Column>
            <Column>
              <NavLink to={'/sykler/' + sykkel.sykkel_id + '/edit'}>{sykkel.modell}</NavLink>
            </Column>
          </Row>
        ))}
        <NavLink to={'/sykler/add'}>Legg til</NavLink>
      </Card>
    );
  }

  mounted() {
    sykkelService.getSykler(sykler => {
      this.sykler = sykler;
    });
  }
}

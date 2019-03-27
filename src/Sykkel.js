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
      <Row>
        <Column><h5>Type</h5></Column>
        <Column><h5>Timepris</h5></Column>
        <Column><h5>Dagspris</h5></Column>
        <Column><h5>Modell</h5></Column>
      </Row>
        {this.sykler.map(sykkel => (
          <Row>    
            <Column key={sykkel.sykkel_id}> 
            
              <NavLink to={'/sykler/' + sykkel.sykkel_id + '/edit'}>{sykkel.type_sykkel}</NavLink>
            </Column>
            <Column>
              <NavLink to={'/sykler/' + sykkel.sykkel_id + '/edit'}>{sykkel.timepris}</NavLink>
            </Column>
            <Column>
              <NavLink to={'/sykler/' + sykkel.sykkel_id + '/edit'}>{sykkel.dagspris}</NavLink>
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

import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { personService } from './services';
import { Card, Column, NavBar, Button, Form } from './widgets';
import { Container, Col, Row } from 'react-bootstrap';

export default class Menu extends Component {
  render() {
    return (
      <div style={{height:"40px", backgroundColor:"lightblue", paddingTop:"11px"}}>
      <Container>
      <Row>
        <Col><NavLink exact activeStyle={{ color: 'darkblue' }} to="/">
                Hjem
              </NavLink></Col>
        <Col><NavLink exact activeStyle={{ color: 'darkblue' }} to="/bestillinger">
                Ny bestilling
              </NavLink></Col>
        <Col><NavLink exact activeStyle={{ color: 'darkblue' }} to="/persons">
                Kunde
              </NavLink></Col>
        <Col><NavLink exact activeStyle={{ color: 'darkblue' }} to="/sykler">
                Sykkel
              </NavLink></Col>
        <Col><NavLink exact activeStyle={{ color: 'darkblue' }} to="/oversikt">
                Bestillingsoversikt
              </NavLink></Col>
      </Row>
    </Container>
    </div>
    );
  }
}

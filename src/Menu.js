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
      <div style={{ height: '70px', backgroundColor: 'lightblue', paddingTop: '11px' }}>
        <Container>
          <Row>
            <Col>
              <NavLink style={{ color: 'black' }} exact activeStyle={{ color: 'peru' }} to="/">
                Hjem
              </NavLink>
            </Col>
            <Col>
              <NavLink style={{ color: 'black' }} exact activeStyle={{ color: 'peru' }} to="/bestillinger">
                Ny bestilling
              </NavLink>
            </Col>
            <Col>
              <NavLink style={{ color: 'black' }} exact activeStyle={{ color: 'peru' }} to="/persons">
                Kunde
              </NavLink>
            </Col>
            <Col>
              <NavLink style={{ color: 'black' }} exact activeStyle={{ color: 'peru' }} to="/sykler">
                Sykkel
              </NavLink>
            </Col>
            <Col>
              <NavLink style={{ color: 'black' }} exact activeStyle={{ color: 'peru' }} to="/bestillingsinfoer">
                Bestillingsoversikt
              </NavLink>
            </Col>
            <Col>
              <NavLink style={{ color: 'black' }} exact activeStyle={{ color: 'peru' }} to="/utstyrer">
                Utstyr
              </NavLink>
            </Col>
            <Col>
              <NavLink style={{ color: 'black' }} exact activeStyle={{ color: 'peru' }} to="/transport">
                Transport
              </NavLink>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

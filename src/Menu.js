import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { personService } from './services';
import { Container, Col, Row } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

export default class Menu extends Component {
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#">Sykkelutleie</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
            <NavLink style={{ color: 'grey' }} exact activeStyle={{ color: 'black' }} to="/">
              Hjem
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink style={{ color: 'grey' }} exact activeStyle={{ color: 'black' }} to="/bestillinger">
              Ny bestilling
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink style={{ color: 'grey' }} exact activeStyle={{ color: 'black' }} to="/persons">
              Kunder
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink style={{ color: 'grey' }} exact activeStyle={{ color: 'black' }} to="/sykler">
              Sykler
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink style={{ color: 'grey' }} exact activeStyle={{ color: 'black' }} to="/utstyrer">
              Utstyr
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink style={{ color: 'grey' }} exact activeStyle={{ color: 'black' }} to="/bestillingsinfoer">
              Bestillingsoversikt
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink style={{ color: 'grey' }} exact activeStyle={{ color: 'black' }} to="/frakter">
              Transport
            </NavLink>
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

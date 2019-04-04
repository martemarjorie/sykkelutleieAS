import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
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
            <NavLink style={{ color: 'grey' }} exact activeStyle={{ color: 'black' }} to="/nybestilling">
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
            <NavLink style={{ color: 'grey' }} exact activeStyle={{ color: 'black' }} to="/bestillinger">
              Bestillingsoversikt
            </NavLink>
          </Nav.Link>

          <Nav.Link>
            <NavLink style={{ color: 'grey' }} exact activeStyle={{ color: 'black' }} to="/reps">
              Reperasjoner
            </NavLink>
          </Nav.Link>

          <Nav.Link>
            <NavLink style={{ color: 'grey' }} exact activeStyle={{ color: 'black' }} to="/frakter">
              Frakt
            </NavLink>
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

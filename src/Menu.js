import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { fraktService } from './services';

export default class Menu extends Component {

  // const steder = ['Finse', 'Haugastøl', 'Myrdal', 'Flåm', 'Hallingskeid'];
  //
  // oppdaterSted(){
  //   const steder = ['Finse', 'Haugastøl', 'Myrdal', 'Flåm', 'Hallingskeid'];
  //   const visSteder = steder.map((steder) =>
  //   <li>{steder}</li>
  //   );
  // };

  render() {
    return (
      <Navbar bg="dark" variant="light">
        <Navbar.Brand href="#" style={{ color: 'DeepSkyBlue' }}>
          Crank Arm
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
            <NavLink style={{ color: 'silver' }} exact activeStyle={{ color: 'DeepSkyBlue' }} to="/">
              Hjem
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink style={{ color: 'silver' }} exact activeStyle={{ color: 'DeepSkyBlue' }} to="./nybestilling">
              Ny bestilling
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink style={{ color: 'silver' }} exact activeStyle={{ color: 'DeepSkyBlue' }} to="./bestillinger">
              Bestillingsoversikt
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink style={{ color: 'silver' }} exact activeStyle={{ color: 'DeepSkyBlue' }} to="./persons">
              Kunder
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink style={{ color: 'silver' }} exact activeStyle={{ color: 'DeepSkyBlue' }} to="./sykler">
              Sykler
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink style={{ color: 'silver' }} exact activeStyle={{ color: 'DeepSkyBlue' }} to="./utstyrer">
              Utstyr
            </NavLink>
          </Nav.Link>

          <Nav.Link>
            <NavLink style={{ color: 'silver' }} exact activeStyle={{ color: 'DeepSkyBlue' }} to="./reps">
              Reparasjoner
            </NavLink>
          </Nav.Link>

          <Nav.Link>
            <NavLink style={{ color: 'silver' }} exact activeStyle={{ color: 'DeepSkyBlue' }} to="./frakter">
              Frakt
            </NavLink>
          </Nav.Link>
        </Nav>
      </Navbar>
      </div>
    );
  }
}

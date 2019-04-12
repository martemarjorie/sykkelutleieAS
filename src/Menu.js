// importerer component fra react-biblioteket. 
// brukes for å lage en GUI-applikasjon med React 
import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar'; // elementene hentes fra bootstrap, styling  
import Nav from 'react-bootstrap/Nav';

// Menu er en subklasse av Component 
export default class Menu extends Component {
  render() {
    return (
      /* legger til forskjellige linker i menyen til de forskjellige sidene,
       styler de og velger egen farge for å vise hvilken man er på (aktiv) */
      <Navbar bg="dark" variant="light">
        <Navbar.Brand href="#" style={{ color: 'DeepSkyBlue' }}>
          Crank Arm
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link>
            <NavLink style={{ color: 'silver' }} exact activeStyle={{ color: 'DeepSkyBlue' }} to="/nybestilling">
              Ny bestilling
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink style={{ color: 'silver' }} exact activeStyle={{ color: 'DeepSkyBlue' }} to="/bestillinger">
              Bestillingsoversikt
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink style={{ color: 'silver' }} exact activeStyle={{ color: 'DeepSkyBlue' }} to="/persons">
              Kunder
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink style={{ color: 'silver' }} exact activeStyle={{ color: 'DeepSkyBlue' }} to="/sykler">
              Sykler
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink style={{ color: 'silver' }} exact activeStyle={{ color: 'DeepSkyBlue' }} to="/utstyrer">
              Utstyr
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink style={{ color: 'silver' }} exact activeStyle={{ color: 'DeepSkyBlue' }} to="/reps">
              Reparasjoner
            </NavLink>
          </Nav.Link>
          <Nav.Link>
            <NavLink style={{ color: 'silver' }} exact activeStyle={{ color: 'DeepSkyBlue' }} to="/frakter">
              Frakt
            </NavLink>
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

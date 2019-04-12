// importerer component fra react-biblioteket. 
// brukes for å lage en GUI-applikasjon med React 
import * as React from 'react';
import { Component } from 'react-simplified';
import Card from 'react-bootstrap/Card'; // elementene hentes fra bootstrap, styling  
import Clock from './Clock'; // klokkeelementet importeres 

// Home er en subklasse av Component 
export default class Home extends Component {
  render() {
    return (
      <div>
        <Card bg="black" className="text-center">
        {/* bakgrunn på hjemsiden */}
          <Card.Img src="bakgrunn6.png" alt="Crank Arm" />
          <Card.ImgOverlay>
            {/*Forside tittelen */}
            <Card.Title style={{ fontSize: '2em', color: 'DeepSkyBlue' }}>System for SykkelUtleie AS</Card.Title>
            <Card.Title className="text-muted">
            {/* Klokke og dato på hjemsiden */}
              <Clock />
            </Card.Title>
          </Card.ImgOverlay>

        </Card>
      </div>
    );
  }
}

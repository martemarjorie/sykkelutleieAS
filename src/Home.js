import * as React from 'react';
import { Component } from 'react-simplified';
import Card from 'react-bootstrap/Card';
import Clock from './Clock';
//Importering av eksterne kilder

export default class Home extends Component {
  render() {
    return (
      <div>

        <Card className="text-center">
        <Card.Header>SykkelUtleie AS</Card.Header>
          <Card.Body>
            {/*Forside tittelen */}
            <Card.Title style={{ fontSize: '4em' }}>CrankArm</Card.Title>
            <Card.Title style={{ fontSize: '1em', color: 'blue'}}>System for SykkelUtleie AS</Card.Title>
            {/* Klokke og dato på hjemsiden */}
            <Card.Title className="text-muted"><Clock /></Card.Title>
          </Card.Body>
          {/*Fargen og størrelsen på footeren på hjem*/}
          <Card.Footer style={{ backgroundColor: 'lightblue', position: 'fixed', bottom: '0', width: '100%' }}></Card.Footer>
        </Card>

      </div>
    );
  }
}

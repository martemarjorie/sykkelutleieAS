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
          <Card.Body>
            <Card.Title style={{ fontSize: '2em' }}>SykkelUtleie AS</Card.Title>
            {/*Forside tittelen */}
            <Clock />
            {/* Klokke og dato på hjemsiden */}
          </Card.Body>
          <Card.Footer style={{ backgroundColor: 'lightblue', position: 'fixed', bottom: '0', width: '100%' }} />
    {/*Fargen og størrelsen på footeren på hjem*/}
        </Card>
      </div>
    );
  }
}

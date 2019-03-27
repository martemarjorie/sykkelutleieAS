import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Card className="text-center">
            <Card.Body>
            <Card.Title style={{ fontSize: '2em' }} >SykkelUtleie AS</Card.Title>
            <Card.Text>Klokkeslett eller klokke</Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
          <Card.Footer className="text-muted" style={{ backgroundColor: 'lightblue' }} >Footer</Card.Footer>
        </Card>
      </div>
    );
  }
}

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Clock from './Clock';

{
  /*
  function CurrentDate() {
  let d = new Date();
    let dato = d.getFullYear() + '-' + (d.getMonth()+1) +
    '-' + d.getDate() +' '+ d.getHours()+':' +
    d.getMinutes()+':'+ d.getSeconds();


  return (
    <p>{dato}</p>
  );
}
*/
}

export default class Home extends Component {
  render() {
    return (
      <div>
        <Card className="text-center">
          <Card.Body>
            <Card.Title style={{ fontSize: '2em' }}>SykkelUtleie AS</Card.Title>
            <Clock />
            {/* <Button variant="primary">Go somewhere</Button> */}
          </Card.Body>
          <Card.Footer style={{ backgroundColor: 'lightblue', position: 'fixed', bottom: '0', width: '100%' }} />
        </Card>
      </div>
    );
  }
}

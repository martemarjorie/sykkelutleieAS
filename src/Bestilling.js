import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { sykkelService, bestillingService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export default class BestillingList extends Component {
  render() {
    return (
      <div>
        <div>
          Skriv inn telefonnummer:
          <InputGroup className="mb-3" style={{ width: '10em' }}>
            <FormControl />
          </InputGroup>
          <button type="button" onClick={this.persons}>
            Finn kunde
          </button>
        </div>
        <div />
      </div>
    );
  }
}

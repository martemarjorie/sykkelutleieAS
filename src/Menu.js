import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { personService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';

export default class Menu extends Component {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <td>
              <NavLink exact activeStyle={{ color: 'darkblue' }} to="/">
                Hjem
              </NavLink>
            </td>
            <td>
              <NavLink exact activeStyle={{ color: 'darkblue' }} to="/bestillinger">
                Ny bestilling
              </NavLink>
            </td>
            <td>
              <NavLink exact activeStyle={{ color: 'darkblue' }} to="/persons">
                Kunde
              </NavLink>
            </td>
            <td>
              <NavLink exact activeStyle={{ color: 'darkblue' }} to="/sykler">
                Sykkel
              </NavLink>
            </td>
            <td>
              <NavLink exact activeStyle={{ color: 'darkblue' }} to="/oversikt">
                Bestillingsoversikt
              </NavLink>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

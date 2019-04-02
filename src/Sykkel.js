import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { sykkelService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';
import Table from 'react-bootstrap/Table';

export default class SykkelList extends Component {
  sykler = [];

  render() {
    return (
      <Card title="Sykler">
        <Table responsive hover>
          <thead>
            <tr>
              <th>Type</th>
              <th>Timepris</th>
              <th>Dagspris</th>
              <th>Modell</th>
              <th>
                <NavLink to={'/sykler/add'}>Legg til ny</NavLink>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.sykler.map(sykkel => (
              <tr key={sykkel.sykkel_id}>
                <td>{sykkel.type_sykkel}</td>
                <td>{sykkel.timepris}</td>
                <td>{sykkel.dagspris}</td>
                <td>{sykkel.modell}</td>
                <td>
                  <NavLink to={'/sykler/' + sykkel.sykkel_id + '/edit'}>Endre</NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <br />
      </Card>
    );
  }

  mounted() {
    sykkelService.getSykler(sykler => {
      this.sykler = sykler;
    });
  }
}

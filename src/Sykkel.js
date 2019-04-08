import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { sykkelService } from './services';
import { Card, Row, Column, NavBar, Form } from './widgets';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default class SykkelList extends Component {
  sykler = [];

  render() {
    return (
      <Card title="Sykler">
        <input type="text" id="sok" onChange={this.sokSykkel} placeholder="Søk..." />
        <br />
        <br />
        <Table responsive hover>
          <thead>
            <tr>
              <th>Type</th>
              <th>Timepris</th>
              <th>Dagspris</th>
              <th>Modell</th>
              <th>Tilhørighet</th>

              <th>
                <NavLink to={'/sykler/add'}>
                  <Button>Legg til ny</Button>
                </NavLink>
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
                <td>{sykkel.tilhorer_sted}</td>
                <td>
                  <NavLink to={'/sykler/' + sykkel.sykkel_id + '/edit'}>
                    <Button>Endre</Button>
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <br />
      </Card>
    );
  }

  sokSykkel() {
    if (document.getElementById('sok').value.length === 0) {
      sykkelService.getSykkel(sykler => {
        this.sykler = sykler;
      });
    } else {
      sykkelService.searchSykkel(document.getElementById('sok').value, sykler => {
        this.sykler = sykler;
      });
    }
  }
  mounted() {
    sykkelService.getSykler(sykler => {
      this.sykler = sykler;
    });
  }
}

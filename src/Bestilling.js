import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { stedService, utstyrService, personService, sykkelService, bestillingService } from './services';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export default class BestillingList extends Component {
  sykler = [];
  utstyrer = [];
  steder = [];
  persons = [];
  telefon = '';
  fornavn = '';
  sykkel_id = '';
  valgteSykler = [];
  valgtUtstyrer = [];

  render() {
    return (
      <div>
        <br />

        <Container>
          <Row>
            <Col>
              <h2>Bestilling</h2>
              <Row>
                <Col>
                  <br />
                  Velg tlf nr:
                  <select
                    id="kunder"
                    value={this.person_id}
                    onChange={e => (this.person_id = e.target.value)}
                    title="Velg kunde"
                  >
                    {this.persons.map(person => (
                      <option key={person.person_id} value={this.persons.indexOf(person)}>
                        {person.tlf} - {person.fornavn}
                      </option>
                    ))}
                  </select>
                  <br />
                  <Button onClick={this.velgKunde}>Velg kunde</Button>
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col>
                  Fra:
                  <input type="date" id="fradato" />
                  <br />
                  Til:
                  <input type="date" id="tildato" />
                  <br />
                  <Button onClick={this.velgDato}>Velg</Button>
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col>
                  Velg sykler:
                  <select
                    id="sykkelValg"
                    value={this.sykkel_id}
                    onChange={e => (this.sykkel_id = e.target.value)}
                    title="Velg sykkel"
                  >
                    {this.sykler.map(sykkel => (
                      <option key={sykkel.sykkel_id} value={this.sykler.indexOf(sykkel)}>
                        {sykkel.type_sykkel + ' ' + sykkel.modell}
                      </option>
                    ))}
                  </select>
                  <br />
                  <Button type="button" onClick={this.leggTilSykkel}>
                    Velg
                  </Button>
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col>
                  Velg utstyr:
                  <select id="utstyrValg" value={this.utstyr_id} onChange={e => (this.utstyr_id = e.target.value)}>
                    {this.utstyrer.map(utstyr => (
                      <option key={utstyr.utstyr_id} value={this.utstyrer.indexOf(utstyr)}>
                        {utstyr.type_utstyr + ' ' + utstyr.beskrivelse}
                      </option>
                    ))}
                  </select>
                  <br />
                  <Button type="button" onClick={this.leggTilUtstyr}>
                    Velg
                  </Button>
                </Col>
              </Row>
              <br />
              <br />
              <Row>
                <Col>
                  Innleveringssted:
                  <select id="velgSted" title="Velg innleveringssted">
                    {this.steder.map(sted => (
                      <option key={sted.sted_navn}>{sted.sted_navn}</option>
                    ))}
                  </select>
                  <br />
                  <Button type="button" onClick={this.leggTilSted}>
                    Velg
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col>
              <h2>Bestillingsoversikt</h2>
              <span id="viskunde">Kunden som er valgt:</span>
              <br />
              <br />
              <span id="visdato">Dato:</span>
              <br />
              <br />
              <span id="vissykkel">Sykkel:</span>
              <br />
              <br />
              <span id="visutstyr">Utstyr:</span>
              <br />
              <br />
              <span id="visinnsted">Innleveringssted:</span>
              <br />
              <br />
              <Button type="button">Bestill</Button>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

  velgKunde() {
    let kunde = this.person_id;
    let valgtkunde = this.persons[kunde];
    document.getElementById('viskunde').innerHTML += `<br>${valgtkunde.fornavn}
    ${valgtkunde.etternavn} <br>
    ${valgtkunde.tlf} <br>
    ${valgtkunde.epost} <br>`;
  }

  velgDato() {
    let fra = document.getElementById('fradato').value;
    let til = document.getElementById('tildato').value;
    document.getElementById('visdato').innerHTML += '<br>' + fra + ' til ' + til;
  }

  leggTilSykkel() {
    let sykkel = this.sykkel_id;
    let valgtsykkel = this.sykler[sykkel];
    document.getElementById('vissykkel').innerHTML += `<br>${valgtsykkel.type_sykkel}
    ${valgtsykkel.modell}`;
    this.valgteSykler.push(valgtsykkel);
    console.log(this.valgteSykler);
  }

  leggTilUtstyr() {
    let utstyr = this.utstyr_id;
    let valgtutstyr = this.utstyrer[utstyr];
    document.getElementById('visutstyr').innerHTML += `<br>${valgtutstyr.type_utstyr}
    ${valgtutstyr.beskrivelse}`;
    this.valgtUtstyrer.push(valgtutstyr);
    console.log(this.valgtUtstyrer);
  }

  leggTilSted() {
    let sted = document.getElementById('velgSted').value;
    document.getElementById('visinnsted').innerHTML += '<br>' + sted;
  }

  mounted() {
    sykkelService.getSykler(sykler => {
      this.sykler = sykler;

      utstyrService.getUtstyrer(utstyrer => {
        this.utstyrer = utstyrer;

        stedService.getSteder(steder => {
          this.steder = steder;

          personService.getPersons(persons => {
            this.persons = persons;
          });
        });
      });
    });
  }

  bruk() {
    console.log(this.telefon);
    this.fornavn = fornavn;
  }
}

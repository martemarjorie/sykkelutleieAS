import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { personService, sykkelService, stedService, utstyrService, bestillingService } from './services';
import { Card } from './widgets';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default class NyBestiling extends Component {
  // Values from the database
  sykler = [];
  persons = [];
  bestillinger = [];
  steder = [];
  utstyrer = [];

  sykkel_ids = [];
  utstyr_ids = [];

  utsted = ['Haugastøl', 'Finse'];

  // Form values
  valgt_kunde = '';
  valgt_sykkel = '';
  valgt_utstyr = '';

  fradato = '';
  tildato = '';

  utleveringssted = '';
  innleveringssted = '';

  errors_to_user = {};
  status_message = '';

  render() {
    return (
      <Row style={{ marginLeft: '2%', marginTop: '2%', marginRight: '2%', marginBottom: '2%' }}>
        <Col>
          <Card title="Opprett bestilling">
            <Form>
              <br />
              <NavLink to={'/persons/add'}>
                <Button variant="outline-secondary" size="sm">
                  Registrer ny kunde
                </Button>
              </NavLink>
              <br />
              <br />

              <Form.Group controlId="kunde">
                <Form.Label>Velg eksisterende kunde</Form.Label>

                <Form.Control
                  as="select"
                  value={this.person_id}
                  onChange={e => (this.person_id = e.target.value)}
                  title="Velg kunde"
                >
                  <option value="no-val" selected disabled hidden>
                    -Ingen valgt kunde-
                  </option>
                  {this.persons.map(person => (
                    <option value={person.person_id}>
                      {person.fornavn} {person.etternavn}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="sykkel">
                <Form.Label>Velg sykkel (press CTRL / CMD for flervalg)</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  value={this.sykkel_ids}
                  onChange={e => {
                    this.sykkel_ids = Array.from(e.target.selectedOptions).map(option => option.value);
                  }}
                  title="Velg sykkel"
                >
                  <option value="no-val" selected disabled hidden>
                    -Ingen valgt sykkel-
                  </option>
                  {this.sykler.map(sykkel => (
                    <option value={sykkel.sykkel_id}>
                      {sykkel.type_sykkel}, {sykkel.modell}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <br />
              <Form.Group controlId="utstyr">
                <Form.Label>Velg utstyr (press CTRL / CMD for flervalg)</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  value={this.utstyr_ids}
                  onChange={e => {
                    this.utstyr_ids = Array.from(e.target.selectedOptions).map(option => option.value);
                  }}
                  title="Velg utstyr"
                >
                  <option value="no-val" selected disabled hidden>
                    -Ingen valgt utstyr-
                  </option>
                  {this.utstyrer.map(utstyr => (
                    <option value={utstyr.utstyr_id}>
                      {utstyr.type_utstyr}, {utstyr.beskrivelse}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <br />
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Fra dato</Form.Label>
                  <Form.Control type="date" value={this.fradato} onChange={e => (this.fradato = e.target.value)} />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Til dato</Form.Label>
                  <Form.Control type="date" value={this.tildato} onChange={e => (this.tildato = e.target.value)} />
                </Form.Group>
              </Form.Row>
              <br />
              <Form.Group controlId="utsted">
                <Form.Label>Velg utleveringssted</Form.Label>
                <Form.Control
                  as="select"
                  value={this.utleveringssted}
                  onChange={e => (this.utleveringssted = e.target.value)}
                >
                  <option value="">– Ingen utlevering valgt –</option>
                  <option value={this.utsted[0]}>{this.utsted[0]}</option>
                  <option value={this.utsted[1]}>{this.utsted[1]}</option>
                </Form.Control>
              </Form.Group>
              <br />
              <Form.Group controlId="innsted">
                <Form.Label>Velg innleveringssted</Form.Label>
                <Form.Control
                  as="select"
                  value={this.innleveringssted}
                  onChange={e => (this.innleveringssted = e.target.value)}
                >
                  <option value="no-val" selected disabeled hidden>
                    -Ingen innlevering valgt-
                  </option>
                  {this.steder.map(sted => (
                    <option value={sted.sted_navn}>{sted.sted_navn}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Card>
        </Col>

        <Col>
          <Card title="Kvittering">
            <div>
              {Object.keys(this.errors_to_user).map(input_key => (
                <div style={{ color: 'red', fontSize: '1.2em' }}>
                  Du har ikke valgt {input_key + this.errors_to_user[input_key]}
                </div>
              ))}
            </div>
            <br />
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
            <span id="visutsted">Utleveringssted:</span>
            <br />
            <br />
            <span id="visinnsted">Innleveringssted:</span>
            <br />
            <br />
          </Card>
          <br />
          <Button type="Button" onClick={this.SendBestilling}>
            Send bestilling
          </Button>
        </Col>
      </Row>
    );
  }

  mounted() {
    personService.getPersons(persons => {
      this.persons = persons;

      sykkelService.getSykler(sykler => {
        this.sykler = sykler;

        stedService.getSteder(steder => {
          this.steder = steder;

          utstyrService.getUtstyrer(utstyrer => {
            this.utstyrer = utstyrer;
          });
        });
      });
    });
  }

  SendBestilling() {
    let idag = new Date();
    let dagsDato = idag.getFullYear();
    // let dagsDatoRiktigFormat = idag.getDate() + '-' + (idag.getMonth() + 1) + '-' + idag.getFullYear();

    if (idag.getMonth() + 1 < 10) {
      dagsDato += '-0' + (idag.getMonth() + 1);
    } else {
      dagsDato += '-' + idag.getMonth() + 1;
    }

    if (idag.getDate() + 1 < 10) {
      dagsDato += '-0' + idag.getDate();
    } else {
      dagsDato += '-' + idag.getDate();
    }

    let utlev_tidspunkt = this.fradato;
    let innlev_tidspunkt = this.tildato;

    console.log(' FRADATO: ' + this.fradato + ' TILDATO: ' + this.tildato + ' DAGSDATO: ' + dagsDato);

    if (this.fradato > this.tildato) {
      alert('Innleveringsdato er tidligere enn' + ' utleveringstidsdato, velg på nytt.');
      return;
    } else {
    }

    if (this.tildato < dagsDato) {
      alert('Innleveringsdato er tidligere enn dagsdato, ' + 'velg på nytt.');
      return;
    } else {
    }

    // Creating an object where an identifier for each intput field is
    // assocated with the value provided by the user (if any).
    let inputs = {
      kunde: this.person_id,
      sykkel: this.sykkel_id,
      'en dato for utlevering': utlev_tidspunkt,
      'en dato for innlevering': innlev_tidspunkt,
      'et utleveringssted': this.utleveringssted,
      'et innleveringssted': this.innleveringssted
    };

    // Validating user inputs
    let validation_errors = this.validate_inputs(inputs);

    // If validate_inputs detected any errors the length of validation_errors
    // keys will be greater than zero. This means validation failed.
    if (Object.keys(validation_errors).length > 0) {
      console.log(validation_errors);
      this.errors_to_user = validation_errors; // This object is used in the React component above to show the erros to the user
      this.status_message = 'Failed';
      return;
    }

    bestillingService.addBestilling(
      this.person_id,
      utlev_tidspunkt,
      innlev_tidspunkt,
      this.utleveringssted,
      this.innleveringssted,
      this.sykkel_ids,
      this.utstyr_ids,
      () => {
        window.history.push('/bestillinger');
      }
    );
  }
  validate_inputs(inputs) {
    /*
    Inputs is an object containing key value pairs, where the key is an
    identifier for the input field, and the value is the value selected by
    the user.
    The keys of the inputs object is iterated over, and for each key we
    check that the associated value is not an empty string, not null and
    not undefined. If all of these criteria are met, an error message
    is not recored in the validation_errors object.
    Once all keys have been iterated over the validation_errors object is
    returned. This can then be used to give feedback to the user in the GUI.
    */
    console.log(inputs);
    let validation_errors = {};
    for (let input_key in inputs) {
      let input = inputs[input_key];
      if (input === '' || input === null || typeof input === 'undefined') {
        validation_errors[input_key] = ' ';
      }
    }

    return validation_errors;
  }
}

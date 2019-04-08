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
      <div>
        <Row>
          <Col>
            <Card title="Opprett bestilling">
              <Form>
                <Form.Group controlId="kunde">
                  <Form.Label>Velg kunde</Form.Label>
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
                <NavLink to={'/persons/add'}>
                  <Button>Opprett kunde</Button>
                </NavLink>
                <br />
                <br />
                <Form.Group controlId="sykkel">
                  <Form.Label>Velg sykkel</Form.Label>
                  <Form.Control
                    as="select"
                    value={this.sykkel_id}
                    onChange={e => (this.sykkel_id = e.target.value)}
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
                  <Form.Label>Velg utstyr</Form.Label>
                  <Form.Control
                    as="select"
                    value={this.utstyr_id}
                    onChange={e => (this.utstyr_id = e.target.value)}
                    title="Velg utstyr"
                  >
                    <option value="no-val" selected disabled hidden>
                      -Ingen utstyr valgt-
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
              <div>
                {Object.keys(this.errors_to_user).map(input_key => (
                  <div>Du har ikke valgt {input_key + this.errors_to_user[input_key]}</div>
                ))}
              </div>
              <br />
            </Card>
          </Col>
          <Col>
            <Card title="Kvittering">
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
      </div>
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

    let dagsDato = idag.getDate() + '-' + (idag.getMonth() + 1) + '-' + idag.getFullYear();

    let utlev_tidspunkt = this.fradato;
    let innlev_tidspunkt = this.tildato;

    if (utlev_tidspunkt > innlev_tidspunkt) {
      alert('Utleveringstidspunktet er tidligere enn ' + 'innleveringstidspunktet, velg på nytt.');
      return;
    } else {
      if (innlev_tidspunkt < dagsDato) {
        alert(
          'Innleveringstidspunktet du har valgt' + ' er tidligere enn dagens dato (' + dagsDato + '), velg på nytt.'
        );
        return;
      } else {
      }
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
      this.sykkel_id,
      this.utstyr_id,
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

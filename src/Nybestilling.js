// importerer component fra react-biblioteket. 
// brukes for å lage en GUI-applikasjon med React 
import * as React from 'react';
import { Component } from 'react-simplified'; // component er en klasse som brukes til å lage et nytt komponent 
import { NavLink } from 'react-router-dom';
import { personService, sykkelService, stedService, utstyrService, bestillingService } from './services'; // importerer fra services.js - classen spørringene hentes fra 
import { Card } from './widgets'; // card elementene hentes fra widgets.js filen, styling  
import Form from 'react-bootstrap/Form'; // elementene hentes fra bootstrap, styling  
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

// NyBestilling er en subklasse av Component 
export default class NyBestilling extends Component {
  // Verdier fra databasen
  sykler = [];
  persons = [];
  bestillinger = [];
  steder = [];
  utstyrer = [];

  // Arrays som holder på flere verdier
  sykkel_ids = [];
  utstyr_ids = [];
  person_id = null;

  //Begrenser utleveringsstedene til kun Haugastøl og Finse
  utsteder = ['1', '2'];

  // Skjemaverdier
  fradato = '';
  tildato = '';

  utleveringssted = '';
  innleveringssted = '';

  errors_to_user = {};
  status_message = '';

  render() {
    return (
      // styling av sidens oppsett  
      <Row style={{ marginLeft: '2%', marginTop: '2%', marginRight: '2%', marginBottom: '2%' }}>
        <Col>
          <Card title="Opprett bestilling">
            <Form>
              <br />
              {/* knapp med link til 'legg til' */}
              <NavLink to={'/persons/add'}>
                <Button variant="outline-secondary" size="sm">
                  Registrer ny kunde
                </Button>
              </NavLink>
              <br />
              <br />

              <Form.Group controlId="kunde">
                <Form.Label>Velg eksisterende kunde</Form.Label>
                
                {/* mulighet til å velge kunde i en select-liste */}
                <Form.Control
                  as="select"
                  value={this.person_id}
                  onChange={e => {
                    console.log('person_id: ', this.person_id);
                    this.person_id = e.target.value;
                  }}
                  title="Velg kunde"
                >
                  <option value="no-val" selected disabled hidden>
                    -Ingen valgt kunde-
                  </option>
                  {/* mapper alle registrerte personer i databasen */}
                  {this.persons.map(person => (
                    <option value={person.person_id}>
                      {person.tlf} - {person.fornavn} {person.etternavn} {/* verdiene som kommer opp i nedtrekkslisten*/}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <br />
              <Form.Row>
                {/* velger fra og til dato, refererer til en funksjon*/}
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
              <Form.Group controlId="utsted">
                <Form.Label>Velg utleveringssted</Form.Label>
                <Form.Control
                  as="select"
                  value={this.utleveringssted}
                  onChange={e => (this.utleveringssted = e.target.value)}
                >
                  <option value="">– Ingen utlevering valgt –</option>
                  <option value={this.utsteder[0]}>Finse</option>
                  <option value={this.utsteder[1]}>Haugastøl</option>
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
                  {/* mapper steder */}
                  {this.steder.map(sted => (
                    <option value={sted.sted_id}>{sted.sted_navn}</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Card>
        </Col>

        <Col>
        {/* får en oversikt over alt en har bestilt */}
        {/* ulik info legges i <span> som referer til en funksjon og har en id */}
          <Card title="Kvittering">
            <div>
              {/* error hvis noe ikke er valgt */}
              {Object.keys(this.errors_to_user).map(input_key => (
                <div style={{ color: 'red', fontSize: '1.2em' }}>
                  Du har ikke valgt {input_key + this.errors_to_user[input_key]}
                </div>
              ))}
            </div>
            <br />
            <span id="viskunde">Kunde:</span>
            <div>{this.valgt_person()}</div> {/* refererer til valgt_person funksjonen */}
            <br />
            <br />
            <span id="visdato">Fra dato: </span>

            {this.fradato}

            <br />

            <span id="visdato">Til dato: </span>
            {this.tildato}
            <br />
            <br />
            <span id="vissykkel">Valgte sykler:</span>
            <div>{this.valgt_sykler()}</div>
            <br />
            <br />
            <span id="visutstyr">Valgt utstyr:</span>
            <div>{this.valgt_utstyr()}</div>
            <br />
            <br />
            <span id="visutsted">Valgt utleveringssted:</span>
            <div>{this.valgt_utlevsted()}</div>
            <br />
            <br />
            <span id="visinnsted">Valgt innleveringssted:</span>
            <div>{this.valgt_innlevsted()}</div>
            <br />
            <br />
          </Card>
          <br />
          <Button type="Button" onClick={this.SendBestilling}> {/* knapp med funksjonen SendBestilling */}
            Send bestilling
          </Button>
        </Col>
      </Row>
    );
  }

   
  // mounted()- funksjonen blir kalt når komponenten blir lagt til for visning 
  // kjører spørringen som ligger i classen 
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

   // hvis person_id stemmer skal all informasjonen printes ut i kvittering 
  valgt_person() {
    let valgt_person = '';
    this.persons.forEach(person => {
      if (person.person_id == this.person_id) {
        document.getElementById('viskunde').innerHTML = `Kunde: <br>${person.fornavn}
        ${person.etternavn} <br>
        ${person.tlf} <br>
        ${person.epost} <br>`;
      }
    });
    return valgt_person;
  }

  // pusher valgt utstyr inn i den tomme arrayen jsx  
  valgt_utstyr() {
    let jsx = [];
    this.utstyr_ids.forEach(utstyr_id => {
      let utstyr = this.utstyrer.find(utstyr => {
        return utstyr.utstyr_id == utstyr_id;
      });
      jsx.push(
        <div>
          {utstyr.type_utstyr} - {utstyr.beskrivelse} ({utstyr.pris} kr)
        </div>
      );
    });
    return <div>{jsx}</div>;
  }

  // pusher valgt sykkel inn i den tomme arrayen vs 
  valgt_sykler() {
    let vs = [];
    this.sykkel_ids.forEach(sykkel_id => {
      let sykkel = this.sykler.find(sykkel => {
        return sykkel.sykkel_id == sykkel_id;
      });
      vs.push(
        <div>
          {sykkel.type_sykkel} - {sykkel.modell} ({sykkel.dagspris} kr)
        </div>
      );
    });
    return <div>{vs}</div>;
  }

  // hvis utsagn 1 stemmer skal valgt utlev-sted være Finse (0) 
  // hvis utsagn 2 stemmer skal valgt utlev-sted være Haugastøl (1) 

  valgt_utlevsted() {
    let valgt_utlevsted = '';
    this.utsteder.forEach(utsted => {
      if ((utsted == this.utleveringssted) == 0) {
        valgt_utlevsted = 'Finse';
      } else if ((utsted == this.utleveringssted) == 1) {
        valgt_utlevsted = 'Haugastøl';
      } else {
        valgt_utlevsted = '';
      }
    });
    return valgt_utlevsted;
  }

  // hvis sted_id hører til innleveringssted skal navnet printes ut 
  valgt_innlevsted() {
    let valgt_innlevsted = '';
    this.steder.forEach(sted => {
      if (sted.sted_id == this.innleveringssted) {
        valgt_innlevsted = sted.sted_navn;
      }
    });
    return valgt_innlevsted;
  }

  SendBestilling() {
    // definerer to variabler, i dag og dagsdato 
    let idag = new Date();
    let dagsDato = idag.getFullYear();

    // gjør om oppsettet slik at datoformatet stemmer 
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

    // definerer utlev_tidspunkt og innlev_tidspunkt. Setter det til fra og tildato 
    let utlev_tidspunkt = this.fradato;
    let innlev_tidspunkt = this.tildato;

    console.log(' FRADATO: ' + this.fradato + ' TILDATO: ' + this.tildato + ' DAGSDATO: ' + dagsDato);

    // hvis fradato er større enn tildato 
    // kjøres if setningen og alert boksen kommer opp 
    if (this.fradato > this.tildato) {
      alert('Innleveringsdato er tidligere enn' + ' utleveringstidsdato, velg på nytt.');
      return;
    } else {
    }

    // hvis tildato er mindre enn dagsdato 
    // kjøres if setningen og alert boksen kommer opp
    if (this.tildato < dagsDato) {
      alert('Innleveringsdato er tidligere enn dagsdato, ' + 'velg på nytt.');
      return;
    } else {
    }

    // Creating an object where an identifier for each intput field is
    // assocated with the value provided by the user (if any).
    let inputs = {
      kunde: this.person_id,
      sykkel: this.sykkel_ids,
      'en dato for utlevering': utlev_tidspunkt,
      'en dato for innlevering': innlev_tidspunkt,
      'et utleveringssted': this.utleveringssted,
      'et innleveringssted': this.innleveringssted
    };

    console.log(this.sykkel_ids);
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

    // fra services og classet bestillingService kjøres addBestilling
    bestillingService.addBestilling(
      this.person_id,
      this.utlev_tidspunkt,
      this.innlev_tidspunkt,
      this.utleveringssted,
      this.innleveringssted,
      this.sykkel_ids,
      this.utstyr_ids,
      () => {
        window.history.push('/bestillinger'); //pusher inn i bestillingsoversikten
      }
    );
    alert('Bestilling foretatt!'); //alert melding som kommer opp når en bestilling har skjedd
    this.props.history.replace('/nybestilling');
    location.reload(); //reloader siden
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

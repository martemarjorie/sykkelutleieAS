// importerer component fra react-biblioteket. 
// brukes for å lage en GUI-applikasjon med React 
import * as React from 'react';
import { Component } from 'react-simplified'; // component er en klasse som brukes til å lage et nytt komponent 
import { NavLink } from 'react-router-dom';
import { personService } from './services'; // importerer fraktService fra services.js - classen spørringene hentes fra
import { Card } from './widgets'; // card elementene hentes fra widgets.js filen, styling 
import Table from 'react-bootstrap/Table'; // bruker elementer fra bootstrap for styling  
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// PersonList er en subklasse av Component
export default class PersonList extends Component {
 // definerer et tomt array 'persons'
  persons = [];

  render() {
    return (
      <Row style={{ marginLeft: '2%', marginTop: '2%', marginRight: '2%', marginBottom: '2%' }}>
        <Col>
          <Card title="Kundeliste">
            <input type="text" id="sok" onChange={this.sokKunde} placeholder="Søk..." />
            <br />
            <br />
            {/* lager en tabell med all kundeinformasjonen */}
            <Table responsive hover>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Fornavn</th>
                  <th>Etternavn</th>
                  <th>Tlf</th>
                  <th>Epost</th>
                  <th>
                    {/* legg til ny kunde */}
                    <NavLink to={'/persons/add'}>
                      <Button>Legg til ny</Button>
                    </NavLink>
                  </th>
                </tr>
              </thead>

           {/* går gjennom alle personene */} 
           {/* .map() funksjonen går gjennom alle elementene i en array i en rekkefølge */}
              {this.persons.map(person => (
                <tbody>
                  {/* setter person_id som unik nøkkel */}
                  <tr key={person.person_id}>
                    <td>{person.person_id}</td> {/* viser alle person id'ene i første rad */}
                    <td>{person.fornavn}</td>
                    <td>{person.etternavn}</td>
                    <td>{person.tlf}</td>
                    <td>{person.epost}</td>
                    <td>
                      {/* knapp med link til endre person */}
                      <NavLink to={'/persons/' + person.person_id + '/edit'}>
                        <Button variant="outline-primary">Endre</Button>
                      </NavLink>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </Card>
        </Col>
      </Row>
    );
  }

   /* Legger inn søk. sjekker hvis det ikke er skrevet noe i søkbaren,
     vis alle kunder,  ellers (hvis det er noe i søkbaren), 
      searchPerson(fra services) med verdien fra søk.value */ 
  sokKunde() {
    if (document.getElementById('sok').value.length === 0) {
      personService.getPersons(persons => {
        this.persons = persons;
      });
    } else {
      personService.searchPerson(document.getElementById('sok').value, persons => {
        this.persons = persons;
      });
    }
  }
  /* mounted()- funksjonen blir kalt når komponenten blir lagt til for visning 
     kjører spørringen som ligger i classen personService med navn getPersons */
  mounted() {
    personService.getPersons(persons => {
      this.persons = persons;
    });
  }
}

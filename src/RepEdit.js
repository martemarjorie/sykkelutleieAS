import * as React from 'react';
import { Component } from 'react-simplified';
import { repService } from './services';
import { Card } from './widgets';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default class FraktEdit extends Component {
  repinnlev_dato = '';
  reputlev_dato = '';
  rep_beskrivelse = '';

  render() {
    return (
      <Container style={{ width: '50%', marginTop: '3%', marginBottom: '3%' }}>
        <Card title="Endre status på reparasjon">
          <Form>
            <Form.Group>
              <Form.Label>Innleveringsdato</Form.Label>
              <Form.Control
                id="repinnlevDato"
                type="date"
                defaultValue={this.repinnlev_dato}
                onChange={e => (this.repinnlev_dato = e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Utleveringsdato</Form.Label>
              <Form.Control
                id="reputlevDato"
                type="date"
                defaultValue={this.reputlev_dato}
                onChange={e => (this.reputlev_dato = e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Beskrivelse</Form.Label>
              <Form.Control
                as="input"
                defaultValue={this.rep_beskrivelse}
                onChange={e => (this.rep_beskrivelse = e.target.value)}
              />
            </Form.Group>
          </Form>
          <Button style={{ width: '67%' }} type="button" variant="outline-success" onClick={this.save}>
            Lagre
          </Button>

          <Button
            style={{ width: '30%', marginLeft: '3%' }}
            type="button"
            variant="outline-danger"
            onClick={this.delete}
          >
            Slett
          </Button>
        </Card>
      </Container>
    );
  }

  mounted() {
    let mnd = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let dato1 = 0;
    let dato2 = 0;

    repService.getRep(this.props.match.params.reparasjons_id, rep => {
      console.log(rep.repinnlev_dato);
      this.repinnlev_dato = rep.repinnlev_dato
        .toString()
        .substr(4, 11)
        .split(' ');
      console.log(this.repinnlev_dato);

      console.log(rep.reputlev_dato);
      this.reputlev_dato = rep.reputlev_dato
        .toString()
        .substr(4, 11)
        .split(' ');
      console.log(this.reputlev_dato);

      this.rep_beskrivelse = rep.rep_beskrivelse;
    });

    setTimeout(() => {
      // Funksjonen som formaterer datoen fra databasen slik at den matcher sidens formatering.

      dato1 = `0${1 + mnd.indexOf(this.repinnlev_dato[0])}`;
      this.repinnlev_dato = `${this.repinnlev_dato[2]}-${dato1}-${this.repinnlev_dato[1]}`;

      console.log(this.repinnlev_dato);

      document.getElementById('repinnlevDato').value = this.repinnlev_dato;
    }, 500);

    setTimeout(() => {
      // Funksjonen som formaterer datoen fra databasen slik at den matcher sidens formatering.

      dato2 = `0${1 + mnd.indexOf(this.reputlev_dato[0])}`;
      this.reputlev_dato = `${this.reputlev_dato[2]}-${dato2}-${this.reputlev_dato[1]}`;

      console.log(this.reputlev_dato);

      document.getElementById('reputlevDato').value = this.reputlev_dato;
    }, 500);
  }

  save() {
    repService.updateRep(
      this.props.match.params.reparasjons_id,
      this.repinnlev_dato,
      this.reputlev_dato,
      this.rep_beskrivelse,

      () => {
        history.push('/reps');
      }
    );
    this.props.history.replace('/reps/');
  }

  delete() {
    repService.deleteRep(
      this.props.match.params.reparasjons_id,
      this.sykkel_id,
      this.repinnlev_dato,
      this.reputlev_dato,
      this.rep_beskrivelse,
      () => {
        history.push('/reps');
      }
    );
    this.props.history.replace('/reps/');
  }
}

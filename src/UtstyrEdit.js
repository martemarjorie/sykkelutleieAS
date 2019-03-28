import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { utstyrService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';

export default class PersonEdit extends Component {
  type_utstyr = '';
  beskrivelse = '';
  pris = '';

  render() {
    return (
      <div style={{ display: 'inline-block', marginLeft: '44%', marginTop: '3%' }}>
        <form>
          <table>
            <tbody>
              <tr>
                <tr>
                  Type utstyr: <br />
                  <input
                    type="text"
                    value={this.type_utstyr}
                    onChange={event => (this.type_utstyr = event.target.value)}
                  />
                </tr>
                <p />
                <tr>
                  Beskrivelse: <br />
                  <input
                    type="text"
                    value={this.beskrivelse}
                    onChange={event => (this.beskrivelse = event.target.value)}
                  />
                </tr>
                <p />
                <tr>
                  Pris:
                  <br /> <input type="number" value={this.pris} onChange={event => (this.pris = event.target.value)} />
                </tr>
                <p />
                <tr>
                  <Row>
                    <Column left>
                      <button
                        style={{
                          position: 'absolute',
                          width: '80px',
                          backgroundColor: 'peru',
                          color: 'cornsilk'
                        }}
                        type="button"
                        onClick={this.save} // this.buttonClicked
                      >
                        Lagre
                      </button>
                    </Column>
                    <Column right>
                      <button
                        style={{
                          position: 'absolute',
                          width: '80px',
                          backgroundColor: 'peru',
                          color: 'cornsilk',
                          marginLeft: '70px'
                        }}
                        type="button"
                        onClick={this.delete} // this.buttonClicked
                      >
                        Slett
                      </button>
                    </Column>
                  </Row>
                </tr>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }

  mounted() {
    utstyrService.getUtstyr(this.props.match.params.utstyr_id, utstyr => {
      this.type_utstyr = utstyr.type_utstyr;
      this.beskrivelse = utstyr.beskrivelse;
      this.pris = utstyr.pris;
    });
  }

  save() {
    utstyrService.updateUtstyr(this.props.match.params.utstyr_id, this.type_utstyr, this.beskrivelse, this.pris, () => {
      history.push('/utstyrer');
    });
  }

  delete() {
    utstyrService.deleteUtstyr(this.props.match.params.utstyr_id, this.type_utstyr, this.beskrivelse, this.pris, () => {
      history.push('/utstyrer');
    });
  }

  //  buttonClicked() {
  //    this.props.history.push('/utstyrer');
  //    console.log('Save clicked');
  //  }
}

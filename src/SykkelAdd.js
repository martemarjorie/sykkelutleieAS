import * as React from 'react';
import { Component } from 'react-simplified';
import ReactDOM from 'react-dom';
import { NavLink, HashRouter, Route } from 'react-router-dom';
import { sykkelService } from './services';
import { Card, Row, Column, NavBar, Button, Form } from './widgets';

export default class SykkelAdd extends Component {
  type_sykkel = '';
  ramme = '';
  hjul_storrelse = '';
  girsystem = '';

  render() {
    return (
      <div style={{marginLeft:"44%",marginTop:"3%"}}>
      <form>
        <table>
          <tbody>
            <tr>
              <tr>
                Type:{' '} <br></br>
                <input
                  type="text"
                  value={this.type_sykkel}
                  onChange={event => (this.type_sykkel = event.target.value)}
                />
              </tr>
              <br></br>
              <tr>
                Ramme: <br></br><input type="text" value={this.ramme} onChange={event => (this.ramme = event.target.value)} />
              </tr>
              <br></br>
              <tr>
                Hjulstrl:{' '}<br></br>
                <input
                  type="number"
                  value={this.hjul_storrelse}
                  onChange={event => (this.hjul_storrelse = event.target.value)}
                />
              </tr>
              <br></br>
              <tr>
                Girsystem:{' '}<br></br>
                <input type="text" value={this.girsystem} onChange={event => (this.girsystem = event.target.value)} />
              </tr>
              <br></br>
              <tr>
                Timepris:{' '}<br></br>
                <input type="text" value={this.timepris} onChange={event => (this.timepris = event.target.value)} />
              </tr>
              <br></br>
              <tr>
                Dagspris:{' '}<br></br>
                <input type="text" value={this.dagspris} onChange={event => (this.dagspris = event.target.value)} />
              </tr>
              <br></br>
              <tr>
                Modell:<br></br> <input type="text" value={this.modell} onChange={event => (this.modell = event.target.value)} />
              </tr>
              <br></br>
              <tr>
                <Row>
                  <Column left>
                    <div ><button style={{position:"absolute", width:"182px", backgroundColor:"peru"}} type="button" onClick={this.add}>
                      Legg til
                    </button></div>
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

  add() {
    sykkelService.addSykkel(
      this.props.match.params.sykkel_id,
      this.type_sykkel,
      this.ramme,
      this.hjul_storrelse,
      this.girsystem,
      () => {
        history.push('/sykler');
      }
    );
  }
}

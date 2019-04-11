import React from 'react';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString()
    };
  }
  // Begynner klokken når man går inn på meny
  componentDidMount() {
    this.intervalID = setInterval(() => this.updateClock(), 1000);
  }
  // Avslutter funksjonen når man forlater hjem siden for å spare minne
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  // Oppdaterer klokken
  updateClock() {
    this.setState({
      time: new Date().toLocaleString()
    });
  }
  render() {
    return <p>{this.state.time}</p>;
  }
}

export default Clock;

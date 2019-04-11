import React from 'react';

/* Lager klokke med state time, som er dagens dato til streng */
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString()
    };
  }
  /* etter den er ferdig rendra, oppdater klokka hvert sekund */
  componentDidMount() {
    this.intervalID = setInterval(() => this.updateClock(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
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

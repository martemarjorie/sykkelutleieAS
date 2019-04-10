import React from 'react';
import Card from 'react-bootstrap/Card';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString()
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(
      () => this.updateClock(),
      1000
    );
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
    return (
      <Card>
        {this.state.time}.
      </Card>
    );
  }
}

export default Clock;

import React from 'react';
import './App.css';

function Wheel(props) {
  return (
    <img className="wheel" src={require(`./assets/${props.value}.svg`)} alt={''}></img>
  );
}

class Slot extends React.Component {
  intervalId = 0;
  timeoutId = 0;

  constructor(props) {
    super(props);
    this.state = {
      wheelValues: this.populateRandomValues(3, 4),
      isRunning: false,
      prizeText: ''
    };
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => this.runSlotMachine(), 5000);
  }

  handleClick(action) {
    clearTimeout(this.timeoutId);
    if (action === 'start') {
      this.runSlotMachine();
    } else {
      this.stopSlotMachine();
    }
  }

  runSlotMachine() {
    this.setState(
      {
        ...this.state,
        isRunning: true,
        prizeText: ''
      }
    );
    this.intervalId = setInterval(() =>
      this.setState(
        {
          ...this.state,
          wheelValues: this.populateRandomValues(3, 4)
        }
      ), 50);
    this.timeoutId = setTimeout(() => this.stopSlotMachine(), 10000);
  }

  stopSlotMachine() {
    clearInterval(this.intervalId);
    this.setState(
      {
        ...this.state,
        isRunning: false,
        prizeText: calculatePrize(this.state.wheelValues)
      }
    )
  }

  populateRandomValues(size, range) {
    return [...Array(size)].map(() => Math.floor(Math.random() * (3 - 0 + 1)) + 0);
  }

  renderWheel(i) {
    return (
      <Wheel value={this.state.wheelValues[i]} />
    );
  }

  render() {
    return (
      <div>
        <div className="button-section">
          <button className="action-button" onClick={() => this.handleClick('start')} disabled={this.state.isRunning}>Start</button>
          <button className="action-button float-right" onClick={() => this.handleClick('stop')} disabled={!this.state.isRunning}>Stop</button>
        </div>
        <div className="board-row">
          {this.renderWheel(0)}
          {this.renderWheel(1)}
          {this.renderWheel(2)}
        </div>
        <div className="prize-text-section"><h2 className="prize-text">{this.state.prizeText}</h2></div>
      </div>
    );
  }
}

class SlotMachine extends React.Component {
  render() {
    return (
      <div className="slot-machine">
        <Slot />
      </div>
    );
  }
}

function calculatePrize(values) {
  let indices = findValuePosition(values);
  let prizeText = 'Congratulations !! You won ';
  if (!indices) {
    return ''
  } else if (indices.length === 3) {
    return prizeText + '100$';
  } else {
    return prizeText + (indices[1] - indices[0] === 1 ? '20$' : '10$');
  }
}

function findValuePosition(values) {
  let indices = {};
  for (let i = 0; i < values.length; i++) {
    if (indices.hasOwnProperty(values[i])) {
      indices[values[i]].push(i);
    } else if (values.lastIndexOf(values[i]) !== i) {
      indices[values[i]] = [i];
    }
  }
  return indices[Object.keys(indices)[0]];
};

export { Slot };
export default SlotMachine;

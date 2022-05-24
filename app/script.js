import React from 'react';
import {render} from 'react-dom';
import {useState} from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      status: 'off',
      time: 0,
      timer: null,
      restTime: 20,
      workTime: 30,
    };
  }

  formatTime = seconds => {
    return ('00' + String(Math.floor(seconds / 60))).slice(-2) + ':' + ('00' + String(seconds % 60)).slice(-2);
  };

  startTimer = () => {
    this.setState({
      time: this.state.workTime,
      status: 'work',
      timer: setInterval(this.count, 1000),
    });
  };

  stopTimer = () => {
    this.setState({
      time: 0,
      status: 'off',
    });
    clearInterval(this.state.timer);
  };

  count = () => {
    const newTime = this.state.time - 1;
    this.setState({
      time: newTime,
    });
    if (this.state.time === 0) {
      if (this.state.status === 'work') {
        this.setState({
          status: 'rest',
          time: this.state.restTime,
        });
        this.playBell();
      } else if (this.state.status === 'rest') {
        this.setState({
          status: 'work',
          time: this.state.workTime,
        });
        this.playBell();
      }
    }
  };

  playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  closeApp = () => {
    window.close();
  };

  render() {
    return (
      <div>
        <h1>Protect your eyes</h1>
        {this.state.status === 'off' && (
          <div>
            <p>
              According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet
              away.
            </p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div>
        )}
        {this.state.status === 'work' && <img src="./images/work.png" />}
        {this.state.status === 'rest' && <img src="./images/rest.png" />}
        {this.state.status !== 'off' && <div className="timer">{this.formatTime(this.state.time)}</div>}
        {this.state.status === 'off' && (
          <button className="btn" onClick={() => this.startTimer()}>
            Start
          </button>
        )}
        {this.state.status !== 'off' && (
          <button className="btn" onClick={() => this.stopTimer()}>
            Stop
          </button>
        )}
        <button className="btn btn-close" onClick={() => this.closeApp()}>
          X
        </button>
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));

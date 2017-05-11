import React from 'react';
import ReactDOM from 'react-dom';

class Clock extends React.Component{

  constructor(){
    super();
    this.state = {
      date_time: new Date()
    };
    this.handle = null;
  }

  componentDidMount(){
    this.updateTime();
  }

  componentWillUnmount(){
    // setInterval sets up a recurring timer and returns
    // a handle
    // clear interval, so setInterval stops running after
    // DOM unmounts
    this.clearInterval(this.handle);
    this.handle = 0;
  }

  tick(){
    this.handle = this.setState({date_time: new Date()});
  }

  updateTime(){
    setInterval(() => this.tick(), 1000);
  }

  render(){
    return(
      <div>
        <h1>Clock</h1>
        <h2>
          {this.state.date_time.toDateString()}
        </h2>
        <h2>
          {this.state.date_time.toLocaleTimeString()}
        </h2>
      </div>
    );
  }

}

export default Clock;

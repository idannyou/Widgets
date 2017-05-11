import React from 'react';
import ReactDOM from 'react-dom';

class Clock extends React.Component{

  constructor(){
    super();
    this.state = {
      time: new Date()
    };
  }

  tick(){
    this.setState({time: new Date()});
  }

  render(){
    return(
      <div>
        <h1>Clock</h1>
        {this.state.time.toString()}
      </div>
    );
  }

}

export default Clock;

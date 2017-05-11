import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock';

class Root extends React.Component {

  constructor(){
    super();
    this.state = {
      children: []
    };

    this.addClock = this.addClock.bind(this);
    this.addWeather = this.addWeather.bind(this);
  }

  addClock(){
    let newChildren = Object.assign([], this.state.children);
    newChildren.push(
      <Clock key={newChildren.length}/>
  );
    this.setState({children: newChildren});
  }

  addWeather(){
    let newChildren = Object.assign([], this.state.children);
    newChildren.push(<h1 key={newChildren.length}>Weather Testing</h1>);
    this.setState({children: newChildren});
  }

  render(){
    return(
      <div>
        {this.state.children}
        <button type='button' onClick={this.addClock}>Add Clock</button>
        <button type='button' onClick={this.addWeather}>Add Weather</button>
      </div>
    );
  }

};


export default Root;

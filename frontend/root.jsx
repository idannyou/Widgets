import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock';

class Root extends React.Component {

  constructor(){
    super();
    this.state = {
      children: {}
    };

    this.addClock = this.addClock.bind(this);
    this.addWeather = this.addWeather.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  addClock(){
    let newChildren = Object.assign({}, this.state.children);
    let currKey = Object.keys(newChildren).length;
    newChildren[currKey] = (
      <div key={currKey}>
        <h1 onClick={() => this.onClose(currKey)}>X</h1>
        <Clock />
      </div>
    );
    this.setState({children: newChildren});
  }

  addWeather(){
    let newChildren = Object.assign({}, this.state.children);
    let currKey = Object.keys(newChildren).length;
    newChildren[currKey] = (
      <div key={currKey}>
        <h1 onClick={() => this.onClose(currKey)}>X</h1>
        <h1>
          Weather Testing {currKey}
        </h1>
      </div>
    );
    this.setState({children: newChildren});
  }

  onClose(key){
    let newChildren = Object.assign({}, this.state.children);
    delete newChildren[key];
    this.setState({children: newChildren});
  }

  objToArray(obj){
    let arr = [];
    Object.keys(obj).map((key) => (
      arr.push(obj[key])
    ));
    return arr;
  }

  render(){
    return(
      <div>
        <button type='button' onClick={this.addClock}>Add Clock</button>
        <button type='button' onClick={this.addWeather}>Add Weather</button>
        {this.objToArray(this.state.children)}
      </div>
    );
  }

}


export default Root;

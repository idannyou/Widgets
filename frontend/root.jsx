import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock';

class Root extends React.Component {

  constructor(){
    super();
    this.state = {
      children: {},
      currKey: 0
    };

    this.addComp = this.addComp.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  addComp(comp){
    let newChildren = Object.assign({}, this.state.children);
    let currKey = this.state.currKey;
    newChildren[currKey] = (
      <div key={currKey}>
        <h1 onClick={() => this.onClose(currKey)}>X</h1>
        <h1>
          {comp}
        </h1>
      </div>
    );
    this.setState({children: newChildren});
    this.setState({currKey: this.state.currKey + 1});
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
        <button type='button' onClick={() => this.addComp(<Clock/>)}>Add Clock</button>
        <button type='button' onClick={() => this.addComp('weather testing')}>Add Weather</button>
        {this.objToArray(this.state.children)}
      </div>
    );
  }

}


export default Root;

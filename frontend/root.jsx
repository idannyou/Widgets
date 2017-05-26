import React from 'react';
import ReactDOM from 'react-dom';
import Clock from './clock';
import Weather from './weather';
import AutoComplete from './autocomplete';



class Root extends React.Component {

  constructor(){
    super();
    this.state = {
      children: {},
      currKey: 0
    };
    this.addComp = this.addComp.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  addComp(comp){
    let newChildren = Object.assign({}, this.state.children);
    let currKey = this.state.currKey;
    newChildren[currKey] = (
      <div key={currKey}
        onMouseEnter = {() => this.onMouseEnter(currKey)}
        onMouseOver = {() => this.onMouseEnter(currKey)}
        onMouseLeave = {() => this.onMouseLeave(currKey)}
      >
        <div className='comp-container'>
          <i
            className={`comp-delete fa fa-times close-${currKey} hidden`}
            aria-hidden="true"
            onClick={() => this.onClose(currKey)}
          >
          </i>
          {comp}
        </div>

      </div>
    );
    this.setState({children: newChildren});
    this.setState({currKey: this.state.currKey + 1});
  }

  onMouseEnter(currKey){
    let element = document.getElementsByClassName(`close-${currKey}`);
    element[0].classList.remove('hidden');
  }

  onMouseLeave(currKey){
    let element = document.getElementsByClassName(`close-${currKey}`);
    element[0].classList.add('hidden');
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
      <div className='container'>
        <div className='container-button'>
          <button type='button' onClick={() => this.addComp(<Clock />)}>Add Clock</button>
          <button type='button' onClick={() => this.addComp(<Weather />)}>Add Weather</button>
          <button type='button' onClick={() => this.addComp(<AutoComplete />)}>Add Auto Complete</button>
        </div>
        <div>
          {this.objToArray(this.state.children)}
        </div>
      </div>
    );
  }

}

export default Root;

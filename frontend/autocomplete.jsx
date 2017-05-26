import React from 'react';
import ReactDOM from 'react-dom';

class AutoComplete extends React.Component{

  constructor(){
    super();
    this.state = {
      inputVal: '',
      strObj: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.autoPopulate = this.autoPopulate.bind(this);
    this.addInput = this.addInput.bind(this);
    this.deleteInput = this.deleteInput.bind(this);
    this.strObj = {};
    this.inputCount = 0;
  }

  autoPopulate(){

    let strObj = Object.assign({}, this.state.strObj);

    let populateArr =
      [
        'Abba',
        'Barney',
        'Barbara',
        'Jeff',
        'Jenny',
        'Sarah',
        'Sally',
        'Xander'
      ]
    ;

    populateArr.forEach((el) =>{
      this.addInput(el);
    });
  }

  onChange(event){
    event.preventDefault();
    let targStr = new RegExp('^' + event.target.value.toLowerCase());
    this.setState({
      strObj: this.strObj
    }, () => {
      let newStrArray = [];
      let strObj = this.strObj;
      let keys = Object.keys(strObj);

      if (keys.length === 0){
        return null;
      }

      for(let i=0; i <keys.length; i++){
        let currLC = strObj[keys[i]].props.value.toLowerCase();
        if (targStr.test(currLC)){
          newStrArray.push(strObj[i]);
        }
      }
      newStrArray = (newStrArray.length === 0)?  ['No Match'] : newStrArray;
      this.setState({
        strObj: newStrArray
      });

    });
  }

  objToList(obj){

    let listArr = [];
    let keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i ++){

        listArr.push(
          <li key={i}>{obj[i]}</li>);
    }
    return listArr;
  }

  addInput(str){
    let currKey = this.inputCount;
    let inputTxt = (
      <div className = 'autocomplete-input-text-container'>
        <input type='text'
          onChange = {(event) => this.onChangeInput(event, currKey)}
          className = 'autocomplete-input-text'
          value={`${str}`}
          />
        <div onClick = {() => this.deleteInput(currKey)}
          className = 'pointer'
          >
          X
        </div>
      </div>
    );
    this.strObj[this.inputCount] = inputTxt;
    this.inputCount ++;
    this.setState({
      strObj: this.strObj
    }, ()=> {});
  }

  deleteInput(currKey){
    console.log(this.strObj)
    delete this.strObj[currKey];
    this.setState({
      strObj: this.strObj
    }, () => {});
    console.log(this.strObj)
  }

  onChangeInput(event, currKey){
    event.preventDefault();
    let str = event.target.value;
    this.strObj[currKey] = (
      <input type='text'
        onChange = {(event) => this.onChangeInput(event, currKey)}
        className = 'autocomplete-input-text'
        value= {str}
      />
    );
    this.setState({
      strObj: this.strObj
    }, ()=> {});
  }

  render(){
    return(
      <div className='comp autocomplete'>
        <div className = 'autocomplete-container'>
          <input
            type='text'
            onChange={(event) => this.onChange(event)}
            placeholder = 'Search ...'
            className='autocomplete-search'
            />
          <ul className='autocomplete-list'>
            {this.objToList(this.state.strObj)}
          </ul>
          <input
            type='button'
            onClick={() => this.addInput('')}
            value='Add Input'
            className = 'autocomplete-input'
            />
          <input
            type='button'
            onClick={this.autoPopulate}
            value='Auto Populate'
            className = 'autocomplete-populate'
            />
        </div>
      </div>
    );
  }

}

export default AutoComplete;

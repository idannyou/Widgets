import React from 'react';
import ReactDOM from 'react-dom';

class AutoComplete extends React.Component{

  constructor(){
    super();
    this.state = {
      inputVal: '',
      strArray: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.autoPopulate = this.autoPopulate.bind(this);
    this.addInput = this.addInput.bind(this);
    this.strArray = {};
    this.inputCount = 0;
  }

  autoPopulate(){

    let strArray = Object.assign({}, this.state.strArray);

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
      this.addInput(el)
    });


  }

  onChange(event){
    event.preventDefault();
    let targStr = new RegExp('^' + event.target.value.toLowerCase());
    this.setState({
      strArray: this.strArray
    }, () => {
      let newStrArray = [];
      let strArray = this.strArray;
      let keys = Object.keys(strArray);

      if (keys.length === 0){
        return null;
      }

      for(let i=0; i <keys.length; i++){
        let currLC = strArray[keys[i]].props.value.toLowerCase();
        if (targStr.test(currLC)){
          newStrArray.push(strArray[i]);
        }
      }
      newStrArray = (newStrArray.length === 0)?  ['No Match'] : newStrArray;
      this.setState({
        strArray: newStrArray
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
      <input type='text'
        onChange = {(event) => this.onChangeInput(event, currKey)}
        className = 'autocomplete-input-text'
        value={`${str}`}
      />
    );
    this.strArray[this.inputCount] = inputTxt;
    this.inputCount ++;
    this.setState({
      strArray: this.strArray
    }, ()=> {});
  }

  onChangeInput(event, currKey){
    event.preventDefault();
    let str = event.target.value;
    this.strArray[currKey] = (
      <input type='text'
        onChange = {(event) => this.onChangeInput(event, currKey)}
        className = 'autocomplete-input-text'
        value= {str}
      />
    );
    this.setState({
      strArray: this.strArray
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
            {this.objToList(this.state.strArray)}
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

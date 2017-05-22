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
      strArray[this.inputCount] = el;
      this.inputCount ++;
    });

    this.setState({
      strArray: strArray
    });
    this.strArray = strArray;
  }

  onChange(event){
    event.preventDefault();
    let targStr = new RegExp('^' + event.target.value.toLowerCase());
    this.setState({
      strArray: this.strArray
    }, () => {
      let newStrArray = [];
      let strArray = this.state.strArray;

      if (strArray.length === 0){
        return null;
      }

      let keys = Object.keys(strArray);

      for(let i=0; i <keys.length; i++){
        // let currLC = (Array.isArray(strArray[i]))? strArray[i][1]:strArray[i];
        let currLC = strArray[keys[i]].toLowerCase();
        // currLC = (currLC)? currLC.toLowerCase() : null;
        if (targStr.test(currLC) || !currLC){
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
    // if (obj.length === 0){
    //   return null;
    // }
    let listArr = [];
    let keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i ++){
      // if (Array.isArray(obj[i])){
      //   let string = (obj[i][1])? obj[i][1]: obj[i][0];
      //   listArr.push(<li key={i}>{string}</li>);
      // } else {
        listArr.push(<li key={i}>{obj[i]}</li>);
      // }
    }
    return listArr;
  }

  addInput(){
    let inputTxt = (
      <input type='text'
        onChange = {(event) => this.onChangeInput(event)}
        data = {this.inputCount}
        className = 'autocomplete-input-text'
      />
    );
    this.strArray.push([inputTxt]);
    this.inputCount ++;
    this.setState({
      strArray: this.strArray
    });
  }

  onChangeInput(event){
    event.preventDefault();
    let key = event.target.getAttribute('data');
    let newArr = [];
    newArr[0] = (this.strArray[key][0]);
    newArr[1] = (event.target.value);
    this.strArray[key] = newArr;
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
            onClick={this.addInput}
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

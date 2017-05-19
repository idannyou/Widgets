import React from 'react';
import ReactDOM from 'react-dom';

class AutoComplete extends React.Component{

  constructor(){
    super();
    this.state = {
      inputVal: '',
      strArray: []
    };
    this.onChange = this.onChange.bind(this);
    this.onChangeInput = this.onChangeInput.bind(this);
    this.autoPopulate = this.autoPopulate.bind(this);
    this.addInput = this.addInput.bind(this);
    this.strArray = [];
    this.inputCount = 0;
  }

  autoPopulate(){
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

    this.inputCount += populateArr.length;
    console.log(this.inputCount)
    populateArr.forEach((el) =>{
      this.strArray.push(el);
    });

    this.setState({
      strArray: this.strArray
    });
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

      for(let i=0; i <strArray.length; i++){
        let currLC = (Array.isArray(strArray[i]))? strArray[i][1]:strArray[i];
        currLC = (currLC)? currLC.toLowerCase() : null;
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

  arrayToList(arr){
    if (arr.length === 0){
      return null;
    }
    let listArr = [];
    for (let i = 0; i < arr.length; i ++){
      if (Array.isArray(arr[i])){
        let string = (arr[i][1])? arr[i][1]: arr[i][0];
        listArr.push(<li key={i}>{string}</li>);
      } else {
        listArr.push(<li key={i}>{arr[i]}</li>);
      }
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
            {this.arrayToList(this.state.strArray)}
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

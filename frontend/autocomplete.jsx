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
    this.autoPopulate = this.autoPopulate.bind(this);
    this.strArray = null;
  }

  inputStr(){
    let strArray = [];
  }

  autoPopulate(){
    this.strArray = [
      'Abba',
      'Barney',
      'Barbara',
      'Jeff',
      'Jenny',
      'Sarah',
      'Sally',
      'Xander'
    ];
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

      if (strArray === null){
        return null;
      }

      for(let i=0; i <strArray.length; i++){
        let currLC = strArray[i].toLowerCase();
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

  arrayToList(arr){
    let listArr = [];
    for (let i = 0; i < arr.length; i ++){
      listArr.push(<li key={i}>{arr[i]}</li>);
    }
    return listArr;
  }

  render(){
    return(
      <div className='comp'>
        <div>
          <input
            type='text'
            onChange={(event) => this.onChange(event)}
            placeholder = 'Search ...'
            className='autocomplete-input'
            />
          <ul className='autocomplete-list'>
            {this.arrayToList(this.state.strArray)}
          </ul>
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

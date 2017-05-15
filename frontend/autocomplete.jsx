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
      for(let i=0; i <strArray.length; i++){
        let currLC = strArray[i].toLowerCase();
        if (targStr.test(currLC)){
          newStrArray.push(strArray[i]);
        }
      }
      newStrArray = (newStrArray.length == 0)?  ['No Match'] : newStrArray;
      this.setState({
        strArray: newStrArray
      });

    });

  }

  render(){
    return(
      <div>
        AutoComplete
        <input type='text' onChange={(event) => this.onChange(event)}/>
        <ul>
          {this.state.strArray}
        </ul>
        <input type='button' onClick={this.autoPopulate} value='Auto Populate'/>
      </div>
    );
  }

}

export default AutoComplete;

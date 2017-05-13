import React from 'react';
import ReactDOM from 'react-dom';

class Weather extends React.Component{

  constructor(props){
    super(props);

  }



  render(){
    let currPos = (this.props.currPos !== {})? this.props.currPos:'Location Not Found';
    return(
      <div className='weather-container comp'>
        <div className='weather'>
          <h1>
            {currPos.toString()}
          </h1>
        </div>
      </div>
    );
  }

}

export default Weather;

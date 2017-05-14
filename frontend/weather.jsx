import React from 'react';
import ReactDOM from 'react-dom';

class Weather extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      currPos: null
    };
  }


  componentDidMount(){
    navigator.geolocation.getCurrentPosition((pos) => {
      this.setState({
        currPos: {lat: pos.coords.latitude, lng: pos.coords.longitude}
      });
    });
  }


  render(){
    let currPos = (this.state.currPos)? this.state.currPos:'Locating Position';
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

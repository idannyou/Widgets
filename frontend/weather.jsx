import React from 'react';
import ReactDOM from 'react-dom';

class Weather extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      location: null,
      temp: null,
      temp_max: null,
      temp_min: null,
      icons: null
    };
    this.currPos = null;
    this.loadWeather = this.loadWeather.bind(this);
  }


  componentDidMount(){
    navigator.geolocation.getCurrentPosition((pos) => {

    this.currPos= {lat: pos.coords.latitude, lng: pos.coords.longitude};

    this.loadWeather();
    });
  }

  KtoF(k){
    let f = k * 9/5 - 459.67;
    return Math.round(f, 2);
  }

  loadWeather(){
    let request = new XMLHttpRequest();
    // using proxy to avoid mix content error
    let cors_api_url = 'https://cors-anywhere.herokuapp.com/';
    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${this.currPos.lat}&lon=${this.currPos.lng}&APPID=f816d7f39052e3a98b21952097a43076`;

    request.open('GET', cors_api_url + url);

    request.onload = () => {
      let resp = request.responseText;
      if (request.status >= 200 && request.status < 400) {
        // Success!
        let data = JSON.parse(resp);
        this.setState(
          {
            location: data.name,
            temp: `${this.KtoF(data.main.temp)} F`,
            temp_max: `${this.KtoF(data.main.temp_max)} F`,
            temp_min: `${this.KtoF(data.main.temp_min)} F`,
            icons: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
          }
        );
      } else {
        // We reached our target server, but it returned an error
        alert(resp);
      }
    };

    request.send();
  }


  render(){

    let temperature = (
      <div className='weather-description'>
        <div className='weather-text'>
          <h2>Location: {this.state.location}</h2>
          <h2>Temperature: {this.state.temp}</h2>
          <h2>Max Temperature: {this.state.temp_max}</h2>
          <h2>Min Temperature: {this.state.temp_min}</h2>
        </div>
        <img src={this.state.icons}/>
      </div>
    );

    return(
      <div className='weather-container comp'>
        <div className='weather'>
            {
              (this.currPos)?
              temperature :
              (
                <div className='weather-load'>
                  Locating Position ...
                </div>)
            }
        </div>
      </div>
    );
  }

}

export default Weather;

import React from 'react';
import ReactDOM from 'react-dom';

class Clock extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      date_time: new Date()
    };
    this.handle = null;
  }

  componentDidMount(){
    this.updateTime();
  }

  componentWillUnmount(){
    // setInterval sets up a recurring timer and returns
    // a handle
    // clear interval, so setInterval stops running after
    // Component unmounts
    clearInterval(this.handle);
    this.handle = 0;
  }

  tick(){
    this.setState({date_time: new Date()});
  }

  updateTime(){
    this.handle = setInterval(() => this.tick(), 1000);
  }

  render(){
    return(
      <div className='clock-container comp'>
        <div className='time-container'>
          <h1>
            {this.state.date_time.toDateString()}
          </h1>
          <h1>
            {this.state.date_time.toLocaleTimeString()}
          </h1>
        </div>
      </div>
    );
  }

}

export default Clock;

import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    zip: "",
    country: "",
    cityName: "",
    temp: "",
    forecast: ""
  }

  

  handleChange = (event) => {
    this.setState({ [event.target.id]: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    //const data = new FormData(event.target);

    const KEY = "9e9806ab00950ba9f05317209cac4f04";
    
    const URL = "https://api.openweathermap.org/data/2.5";
    const ZIP = this.state.zip;
    const COUNTRY = this.state.country;

    var url = `${URL}/weather?zip=${ZIP},${COUNTRY}&APPID=${KEY}&units=imperial`;
    console.log(url);
    fetch(url).then(
      response => response.json()
    ).then(
      json => {
        console.log(json);
        this.setState({temp: json.main.temp, cityName: json.name});
      }
    ).catch(err => console.log(err));
    
    url = `${URL}/forecast?zip=${ZIP},${COUNTRY}&APPID=${KEY}&units=imperial`;
    console.log(url);
    fetch(url).then(
      response => response.json()
    ).then(
      json => {
        console.log(json);
        this.setState({forecast: json});
      }
    );
  }
  

  render() {
    var isdata = this.state.cityName;
    return (
      <div className="wrapper">
        <div className="main-holder">
          {isdata ? (
            <h1>The temp in {this.state.cityName} is {this.state.temp} &#xb0;F</h1>
          ) : (
            <h1>Enter your Zip and Country code to get started</h1>
          )}
          
          <form onSubmit={this.handleSubmit}>
            <input id="zip" type="text" value={this.state.zip} onChange={this.handleChange} placeholder="Zip code"/>
            <input id="country" type="text" value={this.state.country} onChange={this.handleChange} placeholder="Country code" />
            
            <button id="submit" type="submit">Get Temp</button>
          </form>
          

        </div>
        

        
      </div>
    );
  }
}

export default App;

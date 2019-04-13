import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';


const app = new Clarifai.App({
 apiKey: 'e2148d22fcc54687b7b1641d1d583a13'
});


const particlesOptions = {

  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 900
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      route: 'signin',
      isSignedIn: false,
    }
  }


  onInputChange = (event)=> {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = ()=>{
    this.setState({imageUrl: this.state.input})
    app.models.predict('e466caa0619f444ab97497640cefc4dc', this.state.input).then(
      function(response) {
        // do something with response
        // this.calculateFaceLocation(response);

        const name = response.outputs[0].data.regions[0].data.concepts[0].name;
        const valueOfPercentage = response.outputs[0].data.regions[0].data.concepts[0].value;
        const valueOfPercentage1 = (valueOfPercentage * 100).toFixed(2)
        const results = "I am " + valueOfPercentage1 + "% sure that this is " + name;
        setTimeout(()=>{
          alert(results);
        },2000)




      },
      function(err) {
        // there was an error
        console.log(err,'Oops! there seems to be an error.')
      }
    );
  }

onRouteChange = (route) => {
  if (route === 'signout') {
    this.setState({isSignedIn: false})
  } else if (route === 'home') {
    this.setState({isSignedIn: true})
  }
  this.setState({route: route});
  }

  render() {
    const {isSignedIn, imageUrl, route,} = this.state;
    return (
      <div className="App">
      <Particles className='particles'
        params={particlesOptions}
      />

        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home'
        ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} />
          </div>
          : (
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/>
          )

        }
      </div>
    );
  }
}

export default App;

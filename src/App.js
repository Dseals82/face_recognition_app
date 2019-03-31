import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
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
      box: {},
    }
  }

  // calculateFaceLocation = (data) => {
  //   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  //   const image = document.getElementById('inputImage');
  //   const width = Number(image.width);
  //   const height = Number(image.height);
  //   return {
  //     leftcol: clarifaiFace.left_col * width,
  //     topRow: clarifaiFace.top_row * height,
  //     rightCol: width - (clarifaiFace.right_col * width),
  //     bottomRow: height - (clarifaiFace.bottom_row * height),
  //   }
  // }

// displayFaceBox = (box) => {
//   console.log(box)
//   this.setState({box: box});
// }

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
        console.log(results)
      },
      function(err) {
        // there was an error
        console.log(err)
      }
    );
  }
  render() {
    return (
      <div className="App">
      <Particles className='particles'
        params={particlesOptions}
      />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;

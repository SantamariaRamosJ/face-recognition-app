import React, { Component } from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
  apiKey: 'c60868b930064eab8f1ba41799d05653'
});
const particlesOptions = {
    particles: {
      number: {
        value: 90,
        desnsity: {
          enable: true, 
          value_area: 900
        }
      }
    }
  }
  
class App extends Component {
  constructor(props) {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * width)
    }    
  }

  displayFaceBox = (box) =>{
    console.log(box);
    this.setState({box: box});
  }

  onInputchange = (event) => {
    this.setState({input: event.target.value});
  }

  onsubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
        .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
          
          .catch(err => console.log(err));
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
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
          <Particles className='particles' 
          params={particlesOptions}
          />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} /> 
        {route === 'home' 
        ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputchange={this.onInputchange} 
              onSubmit={this.onsubmit} 
              />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
          : (
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} /> 
            : <Register onRouteChange={this.onRouteChange} /> 
          )
      }
      </div>
    );
  }
}

export default App;

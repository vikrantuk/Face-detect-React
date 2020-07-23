import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import key from './key';
import Clarifai from 'clarifai';

const particlesOptions = {
  particles: {
    number:{
      value: 80,
      density: {
        enable: true,
        value_area:800
      }
    }
  }
}

const app = new Clarifai.App({
  apiKey: key
 });

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: ''
    }
  }

  onInputChange= (event) => {
    this.setState({imageURL: event.target.value})
  }

  onSubmit=()=>{
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.imageURL).then(
    function(response) {
      console.log(response)
    },
    function(err) {
      // there was an error
    }
  );
  }

  render(){
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOptions}
        />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
        <FaceRecognition image={this.state.imageURL}/>
      </div>
    );
  }
}

export default App;

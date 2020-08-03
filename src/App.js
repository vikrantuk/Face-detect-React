import React, { Component } from 'react';
import './App.css';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import SignIn from './Components/SignIn/SignIn';
import Register from './Components/Register/Register';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
// import key from './key';
// import Clarifai from 'clarifai';
// import data from './Components/FaceRecognition/calculate';

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


// const app = new Clarifai.App({
//   apiKey: 'a04d0b605099483aaa3d5604ece30f66'
// });

const initialState = {
  input: '',
  imageURL: '',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
      }
}

class App extends Component {
  constructor(){
    super();
    this.state = initialState;
  }

  // componentDidMount(){
  //   fetch('http://localhost:3000').then(res => res.json()).then(console.log);
  // }

  loadUser = user => {
    this.setState({user: {id: user.id, name: user.name, email: user.email, entries: user.entries, joined: user.joined}})
  }

  calculateFaceLocation = (data) => {
    // console.log(data)
    const clarifaiface = data.outputs[0].data.regions;//[0].region_info.bounding_box;
    // const image = document.getElementById('inputimage');
    // const width = Number(image.width);
    // const height = Number(image.height);
    // console.log(width,height);
    // return{
    //   leftCol: clarifaiface.left_col * width,
    //   topRow: clarifaiface.top_row * height,
    //   rightCol: width - (clarifaiface.right_col * width),
    //   bottomRow: height - (clarifaiface.bottom_row * height)
    // }
    // console.log(clarifaiface)
    return clarifaiface;
  }

  displayFaceBox = (box) => {
    // console.log(box[0]);
    this.setState({box});
  }

  onInputChange= (event) => {
    // console.log();
    this.setState({imageURL: URL.createObjectURL(event.target.files[0])});

    const filesSelected = document.getElementById("imageip").files;
    if (filesSelected.length > 0) {
      let fileToLoad = filesSelected[0];

      let fileReader = new FileReader();

      fileReader.onload = (fileLoadedEvent) => {
        let srcData = fileLoadedEvent.target.result;
        srcData = srcData.replace(/^data:image\/(png|jpg|jpeg);base64,/,"");
        this.setState({input: srcData});
        // console.log(this.state.input);
      }
      fileReader.readAsDataURL(fileToLoad);
    }
  }

  onSubmit=()=>{    
    const {displayFaceBox, calculateFaceLocation} = this;
    // let canvas = document.createElement("canvas");
    // const image = document.getElementById('inputimage');
    // canvas.width = Number(image.width);
    // canvas.height= Number(image.height);
    // let ctx = canvas.getContext("2d");
    // ctx.drawImage(image,0,0);
    // let dataURL = canvas.toDataURL("image/jpg");
    // let imageURL = dataURL.replace(/^data:image\/(png|jpg);base64,/,"");
    fetch('https://hidden-dusk-43887.herokuapp.com/imageurl',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then((response) => {
      if(response){
        fetch('https://hidden-dusk-43887.herokuapp.com/image',{
          method: 'put',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        }).then(res => res.json()).then(data => this.setState(Object.assign(this.state.user,{entries:data})))
      }
      displayFaceBox(calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === "home"){
      this.setState({isSignedIn: true})
    }
    else{
      this.setState(initialState)
    }
    this.setState({route});
  }

  render(){
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        { this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
              <FaceRecognition box={this.state.box} image={this.state.imageURL}/>
          </div>
          : ( this.state.route === 'signin'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          )
        }
      </div>
    );
  }
}

export default App;

import React from 'react';
import './App.css';

const firebase = require('firebase');

//componentDidMount - executing all of the code within the function as the component mounts.
//firebase notes: collection is basically a table within a database.
//onSnapshot - automatically gets called every time the 'notes' collection is updated inside of firebase. The paramater (function) within on snapShot is what is called everytime 'notes' updates

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      selectedNoteIndex: null,
      selectedNote: null,
      notes: null

    };
  }

  render(){
    return(
      <div> Howdy.</div>);
  }

  componentDidMount =() => {
    firebase.firestore().collection('notes').onSnapshot();
  }


}

export default App;

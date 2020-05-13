import React from 'react';
import './App.css';

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
      <div> Howdy.</div>

    );
  }
}

export default App;

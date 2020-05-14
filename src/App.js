import React from 'react';
import './App.css';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';

const firebase = require('firebase');

//componentDidMount - executing all of the code within the function as the component mounts.
//firebase notes: collection is basically a table within a database.
//onSnapshot - automatically gets called every time the 'notes' collection is updated inside of firebase. The paramater (function) within on snapShot is what is called everytime 'notes' updates
//serverUpdate is what we are calling the parameter passed into onSnapshot. The serverUpdate object has a docs property.
// data() is a function that grabs the data from the doc.
//data['id'] -> adding the id property to our data object.

//Our selectNote/deleteNote will live at the app.js level. It is handy to keep all of the functions that interact with firebase in the same place.

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
      <div className="app-container">
        <SidebarComponent
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          deleteNote={this.deleteNote}
          selectNote={this.selectNote}
          newNote={this.newNote}>
        </SidebarComponent>
        <EditorComponent></EditorComponent>

      </div>);
  }

  componentDidMount =() => {
    firebase.firestore().collection('notes').onSnapshot(serverUpdate => {
      const notes = serverUpdate.docs.map(_doc => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
      console.log(notes);
      this.setState({ notes: notes});
    });
  }


}

export default App;

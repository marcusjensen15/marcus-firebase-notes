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

//noteUpdate function is interacting with firebase. update is an out of the box firebase method (i believe).
//within noteUpdate, the: firebase.firestore.FieldValue.serverTimestamp() are all built in firebase methods.

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
        {
        this.state.selectedNote ?
        <EditorComponent
          selectedNote={this.state.selectedNote}
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes={this.state.notes}
          noteUpdate={this.noteUpdate}>
        </EditorComponent>
        :
        null
        }
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

selectNote = (note, index) => this.setState({ selectedNoteIndex: index, selectedNote: note});
noteUpdate = (id, noteObj) => {
  firebase
  .firestore()
  .collection('notes')
  .doc(id)
  .update({
    title: noteObj.title,
    body: noteObj.body,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
}

newNote = async (title) => {
  const note = {
    title: title,
    body: ' '
  }
  const newFromDB = await firebase
    .firestore()

}

}

export default App;

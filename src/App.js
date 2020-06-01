import React from 'react';
import './App.css';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';
import InstructionsComponent from './instructions/instructions';


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
        <InstructionsComponent></InstructionsComponent>
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
    .collection('notes')
    .add({
      title: note.title,
      body: note.body,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    const newID = newFromDB.id;
    await this.setState({notes: [...this.state.notes, note]});
    const newNoteIndex = this.state.notes.indexOf(this.state.notes.filter(_note => _note.id === newID)[0]);
    this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex});
}
deleteNote = async (note) =>{
  const noteIndex = this.state.notes.indexOf(note);
  await this.setState({notes: this.state.notes.filter(_note => _note !== note)});
  if(this.state.selectedNoteIndex === noteIndex){
    this.setState({ selectedNoteIndex: null, selectedNote: null});
  }

  //experimental conditionall right here. tyring to get note to not deselect if you delete another one.if you click one below it will de-select.

  else if(this.state.selectedNoteIndex !== noteIndex){
    if(this.state.notes === 0){
    this.setState({ selectedNoteIndex: null, selectedNote: null});
    }
  }

  //above is end of experimental conditional if deleted it will return to the same as origional master


  else{
    this.state.notes.length > 1 ?
    this.selectNote(this.state.notes[this.state.selectedNoteIndex - 1], this.state.selectedNoteIndex - 1)
    :
    this.setState({ selectedNoteIndex: null, selectedNote: null});
  }
  firebase
  .firestore()
  .collection('notes')
  .doc(note.id)
  .delete();

}

}

export default App;

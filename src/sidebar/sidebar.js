import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItemComponent from '../sidebaritem/sidebaritem';

//onKeyUp - when the user lifts their finger from the key. e is the event. updateTitle will be a function updating the title of the note entry. e.target.value (what the user is typing in as the title) is getting passed into our updateTitle function.

//flipping state adding note if the new note button is clicked. this will desplay our title input field. title also set to null because it will be blank when the user begins typing.

class SidebarComponent extends React.Component {
  constructor(){
    super();
    this.state = {
      addingNote: false,
      title: null
    };
  }
  render(){

    const { notes, classes, selectedNoteIndex } = this.props;

    return(
    <div className={classes.sidebarContainer}>
      <Button
        onClick={this.newNoteBtnClick}
        className={classes.newNoteBtn}>
      New Note</Button>
      {
        this.state.addingNote ?
        <div>
          <input type="text"
            className={classes.newNoteInput}
            placeholder=" Enter Note Title"
            onKeyUp={(e) => this.updateTitle(e.target.value)}>
          </input>

        </div> :
        null
      }
    </div>
    );
  }
  newNoteBtnClick = () => {
    console.log("button clicked");
    this.setState({title: null, addingNote: !this.state.addingNote})
  }

  updateTitle = (txt) => {
    console.log('new title: ', txt);
  }
}

export default withStyles(styles)(SidebarComponent);

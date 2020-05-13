import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

//The export default withStyles(styles)(EditorComponent) is styling our EditorComponent. Its going to be a shortcut for styling

//Debouncing is writing a seperate function to handle updating a database when a user stops typing. The purpose of this is so the app isn't making a ton of HTTP requests. 



class EditorComponent extends React.Component {

  constructor() {
    super();
    this.state = {
      text: '',
      title: '',
      id: ''
    };
  }

  render(){
    const { classes } = this.props;

    return(
      <div className={classes.editorContainer}>
        <ReactQuill
          value={this.state.text}
          onChange={this.updateBody}>
        </ReactQuill>
      </div>
    );
  }

  updateBody = async (val) => {
    await this.setState({text: val});
    this.update();
  };

  update = debounce(() => {

  });
}

export default withStyles(styles)(EditorComponent);

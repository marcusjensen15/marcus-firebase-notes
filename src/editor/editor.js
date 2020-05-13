import React from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

//The export default withStyles(styles)(EditorComponent) is styling our EditorComponent. Its going to be a shortcut for styling



class EditorComponent extends React.Component {

  constructor() {
    super();
  }

  render(){
    return(
      <div> This is the Editor Page </div>
    );
  }
}

export default withStyles(styles)(EditorComponent);

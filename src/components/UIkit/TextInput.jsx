import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import blueGrey from '@material-ui/core/colors/blueGrey';

const useStyles = makeStyles({
  root: {
    color: blueGrey[800],
    margin: 12,
    padding: 0,
    backgroundColor: blueGrey[100],
  },
  textField: {
    fontSize: 14,
    padding: 0,
    margin: "-8px 0 0 0",
  },
})

const TextInput = (props) => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField 
        className={classes.textField}
        fullWidth={true}
        id={props.id} 
        value={props.value}
        label={props.label} 
        variant="filled" 
        type={props.type}
        onChange={props.onChange}
        />
    </form>
  );
}

export default TextInput;
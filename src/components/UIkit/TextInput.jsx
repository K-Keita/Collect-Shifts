import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  form: {
    margin: "10px 2%",
  },
  root: {
    borderRadius: 0,
    background: "mintCream",
    margin: "5px 0",
  },
  textField: {
    height: 18,
    fontSize: 18,
    padding: "12px 8px",
  },
})

const TextInput = (props) => {
  const classes = useStyles();

  return (
    <form className={classes.form} noValidate autoComplete="off">
      <TextField 
        InputProps={{
          classes: {
            input: classes.textField,
            root: classes.root,
          },
        }} 
        fullWidth={props.fullWidth}
        id="outlined-basic" 
        value={props.value}
        label={props.label} 
        variant="outlined" 
        type={props.type}
        onChange={props.onChange}
      />
    </form>
  );
}

export default TextInput;
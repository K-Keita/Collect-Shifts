import React from "react";
import blueGrey from "@material-ui/core/colors/blueGrey";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    backgroundColor: blueGrey[100],
    color: blueGrey[800],
    margin: 12,
    padding: 0,
  },
  textField: {
    fontSize: 14,
    margin: "-8px 0 0 0",
    padding: 0,
  },
});

const TextInput = (props) => {
  const classes = useStyles();

  const onFormSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={onFormSubmit}
      className={classes.root}
      noValidate
      autoComplete="off"
    >
      <TextField
        className={classes.textField}
        fullWidth={true}
        id={props.id}
        label={props.label}
        onChange={props.onChange}
        type={props.type}
        value={props.value}
        variant="filled"
      />
    </form>
  );
};

export default TextInput;

import React from 'react';
import blueGrey from '@material-ui/core/colors/blueGrey'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    background: blueGrey[300],
    border: "solid 1.5px #fff",
    boxSizing: "border-box",
    color: blueGrey[50],
    fontSize: 14,
    padding: "3px 0",
    '&:hover': {
      background: blueGrey[500],
      fontSize: 16, 
      fontWeight: "bold",
      padding: 0,
    }
  }
})

const PrimaryButton = (props) => {
  const classes = useStyles();
  return (
    <div style={{width: props.width}} className="m-center">
      <Button className={classes.button} variant="outlined" onClick={props.onClick} fullWidth={props.fullWidth}>{props.label}</Button>
    </div>
  );
}

export default PrimaryButton;
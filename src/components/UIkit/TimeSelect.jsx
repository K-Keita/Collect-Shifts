import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import blueGrey from '@material-ui/core/colors/blueGrey';
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
  formControl: {
    margin: 0,
    width: "55%",
    color: blueGrey[50],
  },
  select: {
    color: blueGrey[50],
    width: 70,
  },
  dropdownStyle: {
    maxHeight: 250,
    border: "solid 1px #fff",
    color: blueGrey[50],
    backgroundColor: blueGrey[400],
  },
});

const TimeSelect = (props) => {
  const classes = useStyles();

  return (
      <FormControl className={classes.formControl}>
      <InputLabel id="select-label">{props.label}</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={props.value}
        className={classes.select}
        onChange={props.handleChange}
        MenuProps={{
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
          getContentAnchorEl: null,
          classes: {
            paper: classes.dropdownStyle,
          },
        }}
      >
        {props.arr.map((value, index) => {
          return (
            <MenuItem key={index} value={value}>
              {value}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

export default TimeSelect;
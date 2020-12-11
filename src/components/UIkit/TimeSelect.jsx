import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {SecondButton} from './index';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import blueGrey from '@material-ui/core/colors/blueGrey';
import { CropLandscapeSharp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 0,
    width: "55%",
    color: blueGrey[50],
  },
  select: {
    color: blueGrey[50],
  }
}));

const TimeSelect = (props) => {
  const classes = useStyles();
  const arr = ["14:00", "15:00", "16:00", "17:00"];


  return (
    <div className="d-flex">
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.select} htmlFor="grouped-native-select">Start</InputLabel>
        <Select className={classes.select} native defaultValue="" id="grouped-native-select" onChange={props.handleChangeStart}>
          <option aria-label="" value="" />
          {arr.map(value => {
            return <option key={value}>{value}</option>
          })}
        </Select>
      </FormControl>
      <p className="time-line">ー</p>
      <FormControl className={classes.formControl}>
        <InputLabel className={classes.select} htmlFor="grouped-select">End</InputLabel>
        <Select className={classes.select} native defaultValue="" id="grouped-native-select" onChange={props.handleChangeEnd} >
          <option aria-label="None" value="" />
          {arr.map(value => {
            return <option key={value}>{value}</option>
          })}
        </Select>
      </FormControl>
    </div>
  );
}

export default TimeSelect;
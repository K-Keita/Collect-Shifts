import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {SecondButton} from './index';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: 0,
    width: 65,
  },
}));

const TimeSelect = (props) => {
  const classes = useStyles();
  const arr = ["14:00", "15:00", "16:00", "17:00"];


  return (
    <div className="d-flex">
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-native-select">Start</InputLabel>
        <Select native defaultValue="" id="grouped-native-select" onChange={props.handleChangeStart}>
          <option aria-label="" value="" />
          {arr.map(value => {
            return <option key={value}>{value}</option>
          })}
        </Select>
      </FormControl>
      <p className="time-line">ー</p>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="grouped-select">End</InputLabel>
        <Select native defaultValue="" id="grouped-native-select" onChange={props.handleChangeEnd} >
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
import React, {useCallback, useEffect, useState} from 'react'
import {TimeSelect} from './index'
import LoopIcon from '@material-ui/icons/Loop';
import { IconButton } from '@material-ui/core';
import {makeStyles} from '@material-ui/core';
import blueGrey from '@material-ui/core/colors/blueGrey';

const useStyles = makeStyles({
  icon: {
    width: "15%",
    color: blueGrey[50],
  }
});

const ToggleShift = React.memo((props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const timeArr = [...Array(15)].map((_, i ) => i + 9)
  const timeLange = [];
  timeArr.map(time => {
    return timeLange.push(`${time}: 00`, `${time}: 30`);
  })

  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen])

  const handleChangeStart = (event) => {
    setStart(event.target.value);
  }
  const handleChangeEnd = (event) => {
    setEnd(event.target.value);
  }
  
  useEffect(() => {
    if (!open) {
        props.func("休み")
      } else {
        if (start !== "" && end !== "" && timeLange.indexOf(start) > timeLange.indexOf(end)) {
          alert ("範囲に誤りがあります")
          setStart("");
          setEnd("");
        } else {
          props.func(`${start}-${end}`)
        }
      }
  }, [start, end, open])
  
  return (
        <div className="d-flex f-between time-field">
          <p className="time-field_date">{props.date}<span>(</span>{props.day}<span>)</span></p>
          {open ? (
            <div className="d-flex">
            <TimeSelect 
              label={"start"}
              value={start} 
              handleChange={handleChangeStart}
              arr={timeLange}
            />
            <p className="time-line">ー</p>
            <TimeSelect
              label={"end"}
              value={end}
              handleChange={handleChangeEnd}
              arr={timeLange}
            />
            </div>
            ) : (
            <p className="time-field_label">休み</p>
          )}
          <IconButton onClick={toggleOpen} className={classes.icon} >
            <LoopIcon />
          </IconButton>
        </div>
  )
})

export default ToggleShift

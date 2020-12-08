import React, {useCallback, useEffect, useState} from 'react'
import {TimeSelect} from './index'
import PrimaryButton from './PrimaryButton';
import SecondButton from './SecondButton';
import LoopIcon from '@material-ui/icons/Loop';
import { IconButton } from '@material-ui/core';


const ToggleShift = React.memo((props) => {
  const [timeLine, setTimeLine] = useState([])
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

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
        props.func(`${start}-${end}`)
      }
  }, [start, end, open])

  console.log(props.timeLine);
  
  return (
    <div>
      <div className="d-flex">
        <div className="d-flex f-between time-field">
            <h3>{props.date}<span>(</span>{props.day}<span>)</span></h3>
            {open ? (
              <TimeSelect 
                start={start} 
                handleChangeStart={handleChangeStart}
                end={end} 
                handleChangeEnd={handleChangeEnd}
              />
              ) : (
              <h2>休み</h2>
            )}
            <IconButton onClick={toggleOpen} style={{width: "15%"}}>
              <LoopIcon />
            </IconButton>
          </div>
      </div>
      
    </div>
  )
})

export default ToggleShift

import React, { useCallback, useEffect, useState } from "react";
import blueGrey from "@material-ui/core/colors/blueGrey";
import LoopIcon from "@material-ui/icons/Loop";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { TimeSelect } from "./index";

const useStyles = makeStyles({
  icon: {
    width: "15%",
    color: blueGrey[50],
  },
});

const ToggleShift = React.memo((props) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const timeArr = [...Array(15)].map((_, i) => i + 9);
  const timeLange = [];
  timeArr.map((time) => {
    return timeLange.push(`${time}: 00`, `${time}: 30`);
  });

  const toggleOpen = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  const handleChangeStart = (event) => {
    setStart(event.target.value);
  };
  const handleChangeEnd = (event) => {
    setEnd(event.target.value);
  };

  useEffect(() => {
    const i1 = timeLange.indexOf(start)
    const i2 = timeLange.indexOf(end)
    if (!open) {
      props.func({lange: "休み", time: 0});
    } else {
      if (
        start !== "" &&
        end !== "" &&
        i1 > i2
      ) {
        alert("範囲に誤りがあります");
        setStart("");
        setEnd("");
      } else {
        props.func({lange: `${start}-${end}`, time: i2 - i1});
      }
    }
  }, [start, end, open]);
  // console.log()

  return (
    <div className="d-flex f-between time-field">
      <p className="time-field_date">
        {props.date}
        <span>(</span>
        {props.day}
        <span>)</span>
      </p>
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
      <IconButton onClick={toggleOpen} className={classes.icon}>
        <LoopIcon />
      </IconButton>
    </div>
  );
});

export default ToggleShift;

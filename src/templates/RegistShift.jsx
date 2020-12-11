import { Divider } from '@material-ui/core';
import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { PrimaryButton, TimeSelect, ToggleShift, ConfirmDialog } from '../components/UIkit/index';
import Button from '@material-ui/core/Button';
import {saveShifts} from '../reducks/groups/operations';
import { getUserName, getUserGroupId } from '../reducks/users/selectors';
import {getGroupId, getGroupName} from '../reducks/groups/selectors';

const d = new Date();
const y = d.getFullYear();
const m = d.getMonth() + 1;

const RegistShift = () => {
  const dispatch = useDispatch();
  const selector = useSelector(state => state);

  const groupId = getGroupId(selector);
  const username= getUserName(selector);
  const groupName = getGroupName(selector);
  const id = getUserGroupId(selector);

  const [monday,setMonday] = useState("");
  const [tuesday, setTuesday] = useState("");
  const [wednesday, setWednesday] = useState("");
  const [thursday, setThursday] = useState("");
  const [friday, setFriday] = useState("");
  const [saturday, setSaturday] = useState("");
  const [sunday, setSunday] = useState("");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const enterShift = () => {
    const arr = []
    shiftWeek.map(shift => {
      arr.push(shift.name)
    })

    dispatch(saveShifts(groupId, dateId, arr, username));
    setOpen(false);
  }

  const startDate = d.getDate() + ((14 - d.getDay() + 1));
  const firstDate = new Date(y, m - 1, startDate);
  const dateId = `${firstDate.getFullYear()}${firstDate.getMonth()}${firstDate.getDate()}`;
  const shiftWeek = [{func: setMonday, name: monday},{func: setTuesday, name: tuesday}, {func: setWednesday, name: wednesday}, {func: setThursday, name: thursday}, {func: setFriday, name: friday}, {func: setSaturday, name: saturday}, {func: setSunday, name: sunday}]

  for (var i = 0; i < 7; i++) {
    // const shiftDate = (firstDate.getMonth() + 1 + '/' + firstDate.getDate());
    const shiftDate = (firstDate.getDate());
    const shiftDay = ["日", "月", "火", "水", "木", "金", "土"][firstDate.getDay()];

    firstDate.setDate(firstDate.getDate() + 1);
  
    shiftWeek[i].date = shiftDate
    shiftWeek[i].day = shiftDay
  }

  return (
    <div>
      <h2>{groupName}</h2>
      <div className="main-container sub-border">
        <div className="time-field_title">シフト登録</div>
        {shiftWeek.map((value, index) => {
          return (
            <ToggleShift timeLine={value.name} func={value.func} key={index} date={value.date} day={value.day}/>
          )
        })}
      </div>
      <div className="midium-space" />
      <PrimaryButton onClick={handleClickOpen} label={"確認"} fullWidth={true} width={"50%"}  />
      <div>
      <ConfirmDialog open={open} handleClose={handleClose} saveShift={enterShift} shiftWeek={shiftWeek} dateId={dateId}  />
      <PrimaryButton label={"シフト１"} fullWidth={false} />
      <PrimaryButton label={"シフト２"} fullWidth={false} />
      </div>
    </div>
  )
}

export default RegistShift;

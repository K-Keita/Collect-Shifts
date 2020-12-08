import { Divider } from '@material-ui/core';
import React, {useState} from 'react'
import { PrimaryButton, TimeSelect, ToggleShift } from '../components/UIkit/index';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const d = new Date();
const y = d.getFullYear();
const m = d.getMonth() + 1;

const RegistShift = () => {
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

  const startDate = d.getDate() + ((14 - d.getDay() + 1));
  const firstDate = new Date(y, m - 1, startDate);
  const shiftWeek = [{func: setMonday, name: monday},{func: setTuesday, name: tuesday}, {func: setWednesday, name: wednesday}, {func: setThursday, name: thursday}, {func: setFriday, name: friday}, {func: setSaturday, name: saturday}, {func: setSunday, name: sunday}]

  for (var i = 0; i < 7; i++) {
    const shiftDate = (firstDate.getMonth() + 1 + '/' + firstDate.getDate());
    const shiftDay = ["日", "月", "火", "水", "木", "金", "土"][firstDate.getDay()];

    firstDate.setDate(firstDate.getDate() + 1);
  
    shiftWeek[i].date = shiftDate
    shiftWeek[i].day = shiftDay
  }

  const shiftView = () => {
    console.log(monday,tuesday,wednesday,thursday,friday,saturday,sunday);
    alert(`${shiftWeek[0].date}:${monday}\n${tuesday}\n${wednesday}\n${thursday}\nでよろしいですか？`)
  }

  return (
    <div>
      <h2>シフト登録</h2>
      {shiftWeek.map((value, index) => {
        return (
          <ToggleShift timeLine={value.name} func={value.func} key={index} date={value.date} day={value.day}/>
        )
      })}
      <div className="midium-space" />
      <PrimaryButton onClick={shiftView} label={"登録"} fullWidth={true} width={"50%"} />

      <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <PrimaryButton label={"シフト１"} fullWidth={false} />
      <PrimaryButton label={"シフト２"} fullWidth={false} />
    </div>

    </div>
  )
}

export default RegistShift;

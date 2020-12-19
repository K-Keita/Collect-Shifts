import React, { useState } from "react";
import {
  ConfirmDialog,
  PrimaryButton,
  ToggleShift,
} from "../components/UIkit/index";
import { getGroupId, getGroupName } from "../reducks/groups/selectors";
import { getUserName, getUserId } from "../reducks/users/selectors";
import { saveShifts } from "../reducks/shifts/operations";
import { useDispatch, useSelector } from "react-redux";

const d = new Date();
const y = d.getFullYear();
const m = d.getMonth() + 1;

const RegistShift = () => {
  const sun = d.getDay() === 0 ? 7 : d.getDay();
  const s = d.getDate() + (14 - sun + 1);
  const firstDate = new Date(y, m - 1, s);
  const dateId = `${firstDate.getFullYear()}${firstDate.getMonth()}${firstDate.getDate()}`;

  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const groupId = getGroupId(selector),
    uid = getUserId(selector),
    username = getUserName(selector);

  const [open, setOpen] = useState(false),
    [monday, setMonday] = useState(""),
    [tuesday, setTuesday] = useState(""),
    [wednesday, setWednesday] = useState(""),
    [thursday, setThursday] = useState(""),
    [friday, setFriday] = useState(""),
    [saturday, setSaturday] = useState(""),
    [sunday, setSunday] = useState("");

  const shiftWeek = [
    { func: setMonday, name: monday },
    { func: setTuesday, name: tuesday },
    { func: setWednesday, name: wednesday },
    { func: setThursday, name: thursday },
    { func: setFriday, name: friday },
    { func: setSaturday, name: saturday },
    { func: setSunday, name: sunday },
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const enterShift = () => {
    const shiftArr = [];
    shiftWeek.map((shift) => {
      return shiftArr.push({ lange: shift.name.lange, time: shift.name.time });
    });

    dispatch(saveShifts(groupId, shiftArr, uid, username));
    setOpen(false);
  };

  for (var i = 0; i < 7; i++) {
    const shiftDate = firstDate.getDate();
    const shiftDay = ["日", "月", "火", "水", "木", "金", "土"][
      firstDate.getDay()
    ];

    firstDate.setDate(firstDate.getDate() + 1);

    shiftWeek[i].date = shiftDate;
    shiftWeek[i].day = shiftDay;
  }

  return (
    <div className="main-container">
      <h3 className="sub-label">シフト登録</h3>
      <div className="sub-border">
        <div className="time-field_title">
          {shiftWeek[0].date}日　〜　{shiftWeek[6].date}日
        </div>
        {shiftWeek.map((value, index) => {
          return (
            <ToggleShift
              date={value.date}
              day={value.day}
              func={value.func}
              key={index}
              timeLine={value.name}
            />
          );
        })}
      </div>
      <div className="midium-space" />
      <PrimaryButton
        fullWidth={true}
        label={"確認"}
        onClick={handleClickOpen}
        width={"50%"}
      />
      <div>
        <ConfirmDialog
          dateId={dateId}
          handleClose={handleClose}
          open={open}
          saveShift={enterShift}
          shiftWeek={shiftWeek}
        />
      </div>
    </div>
  );
};

export default RegistShift;

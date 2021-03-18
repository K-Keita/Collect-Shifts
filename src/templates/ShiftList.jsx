import React, { useState } from "react";
import { getShiftList, getPrevShiftList } from "../reducks/shifts/selectors";
import { getGroupId } from "../reducks/groups/selectors";
import { ShiftTable } from "../components";
import { useSelector } from "react-redux";
import { db } from "../firebase/index";
import {PrimaryButton} from '../components/UIkit/index';

const d = new Date();
const y = d.getFullYear();
const m = d.getMonth() + 1;

const ShiftList = () => {
  const [w1, setW1] = useState([]);
  const [w2, setW2] = useState([]);
  const [w3, setW3] = useState([]);
  const [num, setNum] = useState(0);

  const sun = d.getDay() === 0 ? 7 : d.getDay();
  const s = d.getDate() + (14 - sun + 1);
  const firstDate = new Date(y, m - 1, s);
  const prevFirstDate = new Date(y, m - 1, s - 7);
  const firstDate1 = new Date(y, m - 1, s - 7 * 2);
  const firstDate2 = new Date(y, m - 1, s - 7 * 3);
  const firstDate3 = new Date(y, m - 1, s - 7 * 4);
  const selector = useSelector((state) => state);
  const prevShiftList = getPrevShiftList(selector),
    shiftList = getShiftList(selector);
  const groupId = getGroupId(selector);

  const createWeek = (num) => {
    switch (num) {
      case 0:
        createDate(prevFirstDate);
        break;
      case 1:
        createDate(firstDate1);
        break;
      case 2:
        createDate(firstDate2);
        break;
      default:
        alert("終了")
        break;
    }
  };

  const createDate = async (date) => {
    const id = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
    if (groupId) {
      const doc = await db
        .collection("groups")
        .doc(groupId)
        .collection("shiftsList")
        .doc(id)
        .get();
      const data = doc.data();

      const prevShiftList = data.prevShiftList;
      if (num === 1) {
        setW2(prevShiftList);
        setNum(2);
        return false;
      }
      if (num === 2) {
        setW3(prevShiftList);
        setNum(3);
        return false;
      }

      setW1(prevShiftList);
      setNum(1);
    }
  };

  const shiftWeek = [];
  for (var i = 0; i < 7; i++) {
    const shiftDate = firstDate.getDate();
    const shiftDay = ["日", "月", "火", "水", "木", "金", "土"][
      firstDate.getDay()
    ];

    firstDate.setDate(firstDate.getDate() + 1);
    shiftWeek.push(`${shiftDate}(${shiftDay})`);
  }

  const prevShiftWeek = [];
  for (var index = 0; index < 7; index++) {
    const shiftDate = prevFirstDate.getDate();
    const shiftDay = ["日", "月", "火", "水", "木", "金", "土"][
      prevFirstDate.getDay()
    ];

    prevFirstDate.setDate(prevFirstDate.getDate() + 1);
    prevShiftWeek.push(`${shiftDate}(${shiftDay})`);
  }

  const shiftWeek1 = [];
  for (var i1 = 0; i1 < 7; i1++) {
    const shiftDate = firstDate1.getDate();
    const shiftDay = ["日", "月", "火", "水", "木", "金", "土"][
      firstDate1.getDay()
    ];

    firstDate1.setDate(firstDate1.getDate() + 1);
    shiftWeek1.push(`${shiftDate}(${shiftDay})`);
  }

  const shiftWeek2 = [];
  for (var i2 = 0; i2 < 7; i2++) {
    const shiftDate = firstDate2.getDate();
    const shiftDay = ["日", "月", "火", "水", "木", "金", "土"][
      firstDate2.getDay()
    ];

    firstDate2.setDate(firstDate2.getDate() + 1);
    shiftWeek2.push(`${shiftDate}(${shiftDay})`);
  }
  const shiftWeek3 = [];
  for (var i3 = 0; i3 < 7; i3++) {
    const shiftDate = firstDate3.getDate();
    const shiftDay = ["日", "月", "火", "水", "木", "金", "土"][
      firstDate3.getDay()
    ];

    firstDate3.setDate(firstDate3.getDate() + 1);
    shiftWeek3.push(`${shiftDate}(${shiftDay})`);
  }

  return (
    <div className="list-container">
      <h3 className="sub-label_position">＜シフト一覧＞</h3>
      {num !== 3 && (
        <PrimaryButton label={"前週を見る"} onClick={() => createWeek(num)} width={"20%"} fullWidth={true} />
      )}
      <div className="medium-space" />
      {w3.length > 0 && (
        <>
          <h3>
            {shiftWeek3[0]}〜{shiftWeek3[6]}
          </h3>
          <ShiftTable shiftList={w3} shiftWeek={shiftWeek3} />
        </>
      )}
      {w2.length > 0 && (
        <>
          <h3>
            {shiftWeek2[0]}〜{shiftWeek2[6]}
          </h3>
          <ShiftTable shiftList={w2} shiftWeek={shiftWeek2} />
          <div className="large-space" />
          <div className="large-space" />
        </>
      )}
      {w1.length > 0 && (
        <>
          <h3>
            {shiftWeek1[0]}〜{shiftWeek1[6]}
          </h3>
          <ShiftTable shiftList={w1} shiftWeek={shiftWeek1} />
          <div className="large-space" />
        </>
      )}
      <h3>
        {prevShiftWeek[0]}〜{prevShiftWeek[6]}
      </h3>
      <ShiftTable shiftList={prevShiftList} shiftWeek={prevShiftWeek} />
      <div className="large-space" />
      <h3>
        {shiftWeek[0]}〜{shiftWeek[6]}
      </h3>
      <ShiftTable shiftList={shiftList} shiftWeek={shiftWeek} />
      <div className="medium-space" />
    </div>
  );
};

export default ShiftList;

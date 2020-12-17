import { CollectionsBookmarkOutlined } from "@material-ui/icons";
import React from "react";
import { useSelector } from "react-redux";
import { ShiftTable } from "../components";
import { getShiftList, getPrevShiftList } from "../reducks/groups/selectors";

const d = new Date();
const y = d.getFullYear();
const m = d.getMonth() + 1;

const ShiftList = () => {
  const sun = d.getDay() === 0 ? 7 : d.getDay();
  const s = d.getDate() + (14 - sun + 1);
  const firstDate = new Date(y, m - 1, s);
  const prevFirstDate = new Date(y, m - 1, s - 7);

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

  const selector = useSelector((state) => state);
  const shiftList = getShiftList(selector);
  const prevShiftList = getPrevShiftList(selector);
  console.log(shiftList)
  console.log(shiftWeek)

  return (
    <div className="aaa">
      <h3 className="sub-label_position">シフト一覧</h3>
      <div className="midium-space" />
      <h3>
        {prevShiftWeek[0]}〜{prevShiftWeek[6]}
      </h3>
      <ShiftTable shiftList={prevShiftList} shiftWeek={prevShiftWeek} />
      <div className="midium-space" />
      <h3>
        {shiftWeek[0]}〜{shiftWeek[6]}
      </h3>
      <ShiftTable shiftList={shiftList} shiftWeek={shiftWeek} />
    </div>
  );
};

export default ShiftList;

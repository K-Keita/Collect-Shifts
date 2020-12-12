import React from 'react'
import {useSelector} from 'react-redux';
import { ShiftTable } from '../components'
import {getShiftList} from '../reducks/groups/selectors';

const d = new Date();
const y = d.getFullYear();
const m = d.getMonth() + 1;

const ShiftList = () => {
  const startDate = d.getDate() + ((14 - d.getDay() + 1));
  const firstDate = new Date(y, m - 1, startDate);

  const shiftWeek = [];
  for (var i = 0; i < 7; i++) {
    const shiftDate = (firstDate.getDate());
    const shiftDay = ["日", "月", "火", "水", "木", "金", "土"][firstDate.getDay()];

    firstDate.setDate(firstDate.getDate() + 1);
    shiftWeek.push(`${shiftDate}(${shiftDay})`);
  }

    const selector = useSelector(state => state);
    const shiftList = getShiftList(selector);

  return (
    <div>
      <h2>シフト一覧</h2>
      <ShiftTable shiftList={shiftList} shiftWeek={shiftWeek} />
    </div>
  )
}

export default ShiftList
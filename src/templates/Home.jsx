import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {TextArea, TextInput} from '../components/UIkit/index';
import {push} from 'connected-react-router';
import {getIsSignedIn, getUserName} from '../reducks/users/selectors';
import {listenAuthState} from '../reducks/users/operations';

const d = new Date();
const y = d.getFullYear();
const m = d.getMonth() + 1;

const Home = () => {
  const [value, onChange] = useState(new Date());

  const sun = d.getDay() === 0 ? 7 : d.getDay();
  const s = d.getDate() + (14 - sun + 1);
  const firstDate = new Date(y, m - 1, s);
  const finishDate = new Date(y, m - 1, s + 6);
  const deadline = new Date(y, m - 1, (s - 7) - 1);

  const startDate = firstDate.getMonth() + 1 + '/' + firstDate.getDate();
  const endDate = finishDate.getMonth() + 1 + '/' + finishDate.getDate();
  const deadlineDate = deadline.getMonth() + 1 + '/' + deadline.getDate();
  const maxDate = new Date(y, m + 2 ,1)

  return (
    <div className="main-container">
      <h3>{startDate}〜{endDate}のシフト締め切りは{deadlineDate}です。</h3>
      <h2 className="main-title">calendar</h2>
      <div className="calendar-container">
        <Calendar 
          value={value}
          onChange={onChange}
          locale="ja-JP"
          onClickDay={() => console.log(value.getDate())}
          prev2AriaLabel={null}
          minDate={d}
          maxDate={maxDate}
          next2Label={null}
          prev2Label={null}
        />
      </div>
      
      <h4 className="sub-title">〜連絡事項〜</h4>
      <TextArea text={"特になし"} />

      

    </div>
  )
}

export default Home;

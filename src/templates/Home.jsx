import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {TextArea} from '../components/UIkit/index';
import {push} from 'connected-react-router';

const d = new Date();
const y = d.getFullYear();
const m = d.getMonth() + 1;

const Home = () => {
  const [value, onChange] = useState(new Date());
  const dispatch = useDispatch()

  const s = d.getDate() + ((14 - d.getDay() + 1));
  const firstDate = new Date(y, m - 1, s);
  const finishDate = new Date(y, m - 1, s + 6);
  const deadline = new Date(y, m - 1, s - 7);

  const startDate = firstDate.getMonth() + 1 + '/' + firstDate.getDate();
  const endDate = finishDate.getMonth() + 1 + '/' + finishDate.getDate();
  const deadlineDate = deadline.getMonth() + 1 + '/' + deadline.getDate();
  const maxDate = new Date(y, m + 2 ,1)

  return (
    <div>
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
      <TextArea text={"tesuto"} />

      <h3>{startDate}〜{endDate}のシフト締め切りは{deadlineDate}です。</h3>
      <button onClick={() => dispatch(push("/"))}>aaaa</button>
    </div>
  )
}

export default Home;

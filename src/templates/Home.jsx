import React, {useState} from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

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
      <h2 className="main-title">Home</h2>
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
      
      <div className="midium-space" />

      <div className="main-container">
      <h3>・シフト範囲: 　{startDate}〜{endDate}</h3>
      <h3>・締め切り　: 　{deadlineDate}</h3>
      </div>

    </div>
  )
}

export default Home;

import React, {useEffect, useState} from 'react'
import WeekInfo from './WeekInfo.jsx'

const Weeks = () => {
    const [weeks, setWeeks] = useState([]);
    const [queens, setQueens] = useState([]);
    const [selected, setSelected] = useState('');
    const [selectedWeek, setSelectedWeek] = useState(null);

    const handleChange = (e) => {
        setSelected(e.target.value);
        setSelectedWeek(weeks.find(week => week.week_id == e.target.value));
    }

    useEffect(() => {
        fetch('http://localhost:9000/api/queens', {
            method: 'GET'
        })
        .then(res => res.json()
        .then(queensList => {
            setQueens(queensList);
            fetch('http://localhost:9000/api/weeks', {
                method: 'GET'
            })
            .then(res => res.json()
            .then(weeksList => setWeeks(weeksList))
            )
        })
        )
        .catch(err => console.log(err));
    }, [])

    return (
        <div>
            <select name="weeks" id="weeks" value={selected}onChange={handleChange}>
                <option value={''}>----------</option>
                {weeks.map(week => {
                    return (
                        <option value={week.week_id} key={week.week_id}>Week {week.week_number}</option>
                    )
                })}
            </select>
            {selectedWeek ? 
                <WeekInfo week={selectedWeek} queens={queens} />
                : null
            }
        </div>
    )
}

export default Weeks

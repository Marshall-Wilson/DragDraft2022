import React, {useEffect, useState} from 'react'
import Team from "./Team.jsx"

const Players = () => {
    const [players, setPlayers] = useState([]);
    const [queens, setQueens] = useState([]);
    const [selected, setSelected] = useState('');

    const handleChange = (e) => {
        setSelected(e.target.value);
    }

    useEffect(() => {
        fetch('/api/queens', {
            method: 'GET'
        })
        .then(res => res.json()
        .then(queensList => {
            setQueens(queensList);
            fetch('/api/players', {
                method: 'GET'
            })
            .then(res => res.json()
            .then(playersList => setPlayers(playersList))
            )
        })
        )
        .catch(err => console.log(err));
    }, [])


    return (
        <div>
            <select name="players" id="players" value={selected}onChange={handleChange}>
                <option value={''}>----------</option>
                {players.map(player => <option value={player.player_id} key={player.player_id}>{player.player_name}</option>)}
            </select>
            {players && selected ? 
                <div>
                    <Team player={players.find(player => player.player_id == selected)} queens={queens}/>
                </div>            
                : null
            }
        </div>
    )
}

export default Players

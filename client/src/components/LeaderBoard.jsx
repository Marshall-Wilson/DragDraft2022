import React, {useEffect, useState} from 'react'
import PlayerRow from "./PlayerRow.jsx"

const LeaderBoard = () => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetch('/api/players', {
                method: 'GET'
        })
        .then(res => res.json()
        .then(playersList => setPlayers(playersList))
        )
        .catch(err => console.log(err));
    }, [])

    return (
        <div className="ldb pageContainer">
            <h2>Player Rankings</h2>
            {players.sort((a, b) =>b.player_points - a.player_points).map((player, i) => {
                return (
                    <PlayerRow player={player} top={i===0} key={player.player_id}/>
                )
            })}
        </div>
    )
}

export default LeaderBoard

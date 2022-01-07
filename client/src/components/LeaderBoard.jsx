import React, {useEffect, useState} from 'react'

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
        <div className="ldb">
            <h2>Leaderboard</h2>
            {players.map((player, idx) => {
                return (
                    <div className="ldbPlayer" key={player.player_id}>
                        <h3>{player.player_name}</h3>
                        <p>{player.player_points}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default LeaderBoard

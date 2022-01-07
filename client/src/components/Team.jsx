import React from 'react'
import QueenRow from "./QueenRow.jsx"

const Team = ({player, queens}) => {
    const team = queens.filter(elmt => player.player_queens.includes(elmt.queen_id))

    return (
        <div className="playerTeam queenContainer">
            {team.map(queen => <QueenRow queen={queen}/>)}
            <p className="teamPoints">Total Points: {player.player_points.toLocaleString('en-US', {minimumIntegerDigits: 2})}</p>
        </div>
    )
}

export default Team

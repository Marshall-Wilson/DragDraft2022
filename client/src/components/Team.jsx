import React from 'react'
import {Link} from 'react-router-dom'


const Team = ({player, queens}) => {
    const team = queens.filter(elmt => player.player_queens.includes(elmt.queen_id))

    return (
        <div className="playerTeam">
            <h3>Team</h3>
            {team.map(queen => {
                return(
                    <div key={queen.queen_id}>
                        <Link to={`/queens/${queen.queen_id}`}>{queen.queen_name}:</Link>
                        <p>{queen.total_points}</p>
                    </div>)
                })
            }
            <p>Total Points: {player.player_points}</p>
        </div>
    )
}

export default Team

import React from 'react'

const QueenInfo = ({queen}) => {
    return (
        <div>
            <h1>{queen.queen_name}</h1>
            <img src={`/images/${queen.queen_id}.jpg`} alt={queen.queen_name} onError={({ target }) => {
                target.onError = null; // prevents looping
                target.src="/images/S14Logo.webp";
            }}/>
            <h2>Maxi Wins:</h2>
            <p>{queen.maxi_wins}</p>
            <h2>Mini Wins:</h2>
            <p>{queen.mini_wins}</p>
            <h2>Lipsync Wins:</h2>
            <p>{queen.ls_wins}</p>
            <h2>Week Eliminated:</h2>
            <p>{queen.elim_week ? queen.elim_week : "not eliminated"}</p>
            <h2>Total Points:</h2>
            <p>{queen.total_points}</p>
        </div>
    )
}

export default QueenInfo

import React from 'react'

const QueenInfo = ({queen}) => {
    return (
        <div className="queenInfo pageContainer">
            <h1>{queen.queen_name}</h1>
            <img src={`/images/full_promo/${queen.queen_name.toLowerCase().slice(0, 4)}.jpg`} alt={queen.queen_name} onError={({ target }) => {
                target.onError = null; // prevents looping
                target.src="/images/S14Logo.webp";
            }}/>
            <div className="queenInfoData">
                <p>Maxi Wins:</p>
                <h4>{queen.maxi_wins.toLocaleString('en-US', {minimumIntegerDigits: 2})}</h4>
            </div>
            <div className="queenInfoData">
                <p>Mini Wins:</p>
                <h4>{queen.mini_wins.toLocaleString('en-US', {minimumIntegerDigits: 2})}</h4>
            </div>
            <div className="queenInfoData">
                <p>Lipsync Wins:</p>
                <h4>{queen.ls_wins.toLocaleString('en-US', {minimumIntegerDigits: 2})}</h4>
            </div>
            <div className="queenInfoData">
                <p>Week Eliminated:</p>
                <h4>{queen.elim_week ? queen.elim_week.toLocaleString('en-US', {minimumIntegerDigits: 2}) : "not eliminated"}</h4>
            </div>
            <div className="queenInfoData">
                <p>Total Points:</p>
                <h4>{queen.total_points.toLocaleString('en-US', {minimumIntegerDigits: 2})}</h4>
            </div>
        </div>
    )
}

export default QueenInfo

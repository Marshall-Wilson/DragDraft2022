import React from 'react'

const PlayerRow = ({player, top}) => {
    return (
        <div className="playerRow infoRow" key={player.player_id}>
            <p className="playerScore">{player.player_points.toLocaleString('en-US', {minimumIntegerDigits: 2})}</p>
            <p className="playerName">{player.player_name}</p>
            <div className="trophyContainer">
                {top ? <img src={"./images/trophy.png"} alt="trophy"/> : null}
            </div>
        </div>
    )
}

export default PlayerRow
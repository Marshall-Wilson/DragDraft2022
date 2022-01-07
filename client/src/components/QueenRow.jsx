import React from 'react'
import { Link } from 'react-router-dom'

const QueenRow = ({queen}) => {
    return (
        <Link to={`/queens/${queen.queen_id}`} className="queenRow infoRow" key={queen.queen_id}>
            <img src={`/images/full_promo/${queen.queen_name.toLowerCase().slice(0, 4)}.jpg`} alt="queen icon" className="queenIcon"/>
            <p className="queenName">{queen.queen_name}</p>   
            <p className="queenPoints">{queen.total_points.toLocaleString('en-US', {minimumIntegerDigits: 2})}</p>
        </Link>
    )
}

export default QueenRow

import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom"

const Queens = () => {
    const [queens, setQueens] = useState([]);

    useEffect(() => {
        fetch('http://localhost:9000/api/queens', {
            method: 'GET'
        })
        .then(res => res.json()
            .then(queensList => setQueens(queensList))
        )
        .catch(err => console.log(err));
    }, [])

    return (
        <div>
            {queens.map((queen, i) => {
                return (
                    <div className="queensQueen" key={i}>
                        <Link to={`/queens/${queen.queen_id}`}>{queen.queen_name}</Link>   
                        <p>Total Points: {queen.total_points}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Queens

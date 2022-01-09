import React, {useEffect, useState} from 'react'
import QueenRow from "./QueenRow.jsx"

const Queens = () => {
    const [queens, setQueens] = useState([]);

    // Retrieve queens list on mount
    useEffect(() => {
        fetch('/api/queens', {
            method: 'GET'
        })
        .then(res => res.json()
            .then(queensList => setQueens(queensList))
        )
        .catch(err => console.log(err));
    }, [])

    return (
        <div className="queenContainer pageContainer">
            <h2>Queens</h2>
            {queens.map((queen) => {
                return (
                    <QueenRow queen={queen}/>
                )
            })}
        </div>
    )
}

export default Queens

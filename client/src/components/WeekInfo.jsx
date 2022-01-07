import React from 'react'
import QueenRow from "./QueenRow.jsx"

const WeekInfo = ({week, queens}) => {

    const weekData = {
        "Maxi Challenge": queens.filter(queen => week.maxi_winner.includes(queen.queen_id)),
        "Mini Challenge": queens.filter(queen => week.mini_winner.includes(queen.queen_id)),
        "Lipsync Winner(s)": queens.filter(queen => week.ls_winner.includes(queen.queen_id)),
        "Eliminated": queens.filter(queen => week.elims.includes(queen.queen_id)),
        "Top Three": queens.filter(queen => week.top_three.includes(queen.queen_id)),
        "Season Winner": queens.filter(queen => week.winner.includes(queen.queen_id))
    }

    return (
        <div className="weekWinnersContainer queenContainer">
            {Object.keys(weekData).map(field => {
                if (weekData[field].length > 0) {
                    return(
                        <div key={field}>
                            <p className="weekField">{field}</p>
                            {weekData[field].map(queen => <QueenRow queen={queen}/>)}
                        </div>
                    )
                } else {
                    return null;
                }
            })}
        </div>
    )
}

export default WeekInfo

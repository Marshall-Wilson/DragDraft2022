import React from 'react'
import { Link } from 'react-router-dom'

const WeekInfo = ({week, queens}) => {

    const weekData = {
        "Maxi Winner:": queens.filter(queen => week.maxi_winner.includes(queen.queen_id)),
        "Mini Winner:": queens.filter(queen => week.mini_winner.includes(queen.queen_id)),
        "Lipsync Winner:": queens.filter(queen => week.ls_winner.includes(queen.queen_id)),
        "Eliminated:": queens.filter(queen => week.elims.includes(queen.queen_id)),
        "Top Three:": queens.filter(queen => week.top_three.includes(queen.queen_id)),
        "Winner": queens.filter(queen => week.winner.includes(queen.queen_id))
    }

    return (
        <div>
            {Object.keys(weekData).map(field => {
                if (weekData[field].length > 0) {
                    return(
                        <div key={field}>
                            <p>{field}</p>
                            {weekData[field].map(queen => {
                                return(
                                    <Link to={`/queens/${queen.queen_id}`}>{queen.queen_name}</Link>
                                )
                            })}
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

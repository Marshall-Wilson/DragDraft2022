import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import QueenInfo from "./QueenInfo.jsx"

const QueenInfoContainer = () => {
    const params = useParams();
    const [queen, setQueen] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:9000/api/queens/${params.queenid}`, {method: 'GET'})
        .then(res => res.json())
        .then(resQueen => setQueen(resQueen));
    }, [params])
    
    
    return (
        <div>
            {queen ?
                <QueenInfo queen={queen}/>
                : <p>Loading...</p>
            }
        </div>
    )
}

export default QueenInfoContainer

import React, { useEffect, useState } from 'react'

const Admin = () => {
    const [queens, setQueens] = useState([]);
    const [formState, setFormState] = useState({
        week: 1,
        maxiWinners: [], // Array of "checked" boolean for each queen
        miniWinners: [],
        lsWinners: [],
        elims: [],
        topThree: [],
        winner: []
    });

    const handleNumChange = ({ target }) => {
        const value = target.value;
        const name = target.name;
        setFormState(values => ({...values, [name]: value}));
    }

    const handleCheckChange = (name, idx) => {
        let newFormState = Object.assign({}, formState);
        newFormState[name][idx] = !newFormState[name][idx];
        setFormState(newFormState);
    }

    // Parse/validate data and submit new week to database on submit
    const handleSubmit = (e) => {
        e.preventDefault();
        let data = Object.assign({}, formState);
        for (let field in data) {
            if (field !== "week") {
                data[field] = data[field].map((elmt, idx) => {
                    if (elmt) {
                        return queens[idx].queen_id;
                    } else {
                        return null;
                    }
                })
                data[field] = data[field].filter((elmt) => elmt);
            }
        }
        fetch('/api/weeks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    // Retrieve queen data on mount
    useEffect(() => {
        fetch('/api/queens', {
            method: 'GET'
        })
        .then(res => res.json()
            .then(queensList => {
                setFormState({
                    week: 1,
                    maxiWinners: new Array(queensList.length).fill(false),
                    miniWinners: new Array(queensList.length).fill(false),
                    lsWinners: new Array(queensList.length).fill(false),
                    elims: new Array(queensList.length).fill(false),
                    topThree: new Array(queensList.length).fill(false),
                    winner: new Array(queensList.length).fill(false)
                });
                setQueens(queensList);
            })
        )
        .catch(err => console.log(err));
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label className="formLabel formNumber">Week:
                    <input type="number" value={formState.week} id="week" name="week" min="1" max="14" onChange={handleNumChange}/>
                </label>
                <label className="formLabel formCheckboxContainer">Maxi Winner(s):
                    {queens.map((queen, idx)=> {
                        return(
                            <label key={queen.queen_id} className="formCheckbox"> {queen.queen_name}
                                <input type="checkbox" id={idx} name="maxiWinners" value={queen.queen_name} checked={formState.maxiWinners[idx]} onChange={() => handleCheckChange("maxiWinners", idx)}/>
                            </label>
                        )
                    })}
                </label>
                <label className="formLabel formCheckboxContainer">Mini Winner(s):
                    {queens.map((queen, idx)=> {
                        return(
                            <label key={queen.queen_id} className="formCheckbox"> {queen.queen_name}
                                <input type="checkbox" id={idx} name="miniWinners" value={queen.queen_name} checked={formState.miniWinners[idx]} onChange={() => handleCheckChange("miniWinners", idx)}/>
                            </label>
                        )
                    })}
                </label>
                <label className="formLabel formCheckboxContainer">Lipsync Winner(s):
                    {queens.map((queen, idx)=> {
                        return(
                            <label key={queen.queen_id} className="formCheckbox"> {queen.queen_name}
                                <input type="checkbox" id={idx} name="lsWinners" value={queen.queen_name} checked={formState.lsWinners[idx]} onChange={() => handleCheckChange("lsWinners", idx)}/>
                            </label>
                        )
                    })}
                </label>
                <label className="formLabel formCheckboxContainer">Eliminated Queen(s):
                    {queens.map((queen, idx)=> {
                        return(
                            <label key={queen.queen_id} className="formCheckbox"> {queen.queen_name}
                                <input type="checkbox" id={idx} name="elims" value={queen.queen_name} checked={formState.elims[idx]} onChange={() => handleCheckChange("elims", idx)}/>
                            </label>
                        )
                    })}
                </label>
                <label className="formLabel formCheckboxContainer">Top Queens:
                    {queens.map((queen, idx)=> {
                        return(
                            <label key={queen.queen_id} className="formCheckbox"> {queen.queen_name}
                                <input type="checkbox" id={idx} name="topThree" value={queen.queen_name} checked={formState.topThree[idx]} onChange={() => handleCheckChange("topThree", idx)}/>
                            </label>
                        )
                    })}
                </label>
                <label className="formLabel formCheckboxContainer">Winner:
                    {queens.map((queen, idx)=> {
                        return(
                            <label key={queen.queen_id} className="formCheckbox"> {queen.queen_name}
                                <input type="checkbox" id={idx} name="winner" value={queen.queen_name} checked={formState.winner[idx]} onChange={() => handleCheckChange("winner", idx)}/>
                            </label>
                        )
                    })}
                </label>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default Admin

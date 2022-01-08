import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'

const PlayerSignup = () => {
    const [queens, setQueens] = useState([]);
    const [formState, setFormState] = useState({
        name: "",
        playerQueens: []
    });
    let navigate = useNavigate();

    const handleNameChange = ({ target }) => {
        const value = target.value;
        const name = target.name;
        setFormState(values => ({...values, [name]: value}));
    }

    const handleCheckChange = (idx) => {
        let newFormState = Object.assign({}, formState);
        // Don't allow new checkmarks if there are already 5
        if (!newFormState.playerQueens[idx]) {
            if (newFormState.playerQueens.filter(elmt => elmt).length < 5) {
                newFormState.playerQueens[idx] = !newFormState.playerQueens[idx];
            }
        } else {
            newFormState.playerQueens[idx] = !newFormState.playerQueens[idx];
        }
        setFormState(newFormState);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = Object.assign({}, formState);
        data.playerQueens = data.playerQueens.map((elmt, idx) => {
            if (elmt) {
                return queens[idx].queen_id;
            } else {
                return null;
            }
        })
        data.playerQueens = data.playerQueens.filter((elmt) => elmt);
        if (data.name && data.playerQueens.length === 5) {
            fetch('/api/players', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => navigate('/'));
        }
    }

    useEffect(() => {
        fetch('/api/queens', {
            method: 'GET'
        })
        .then(res => res.json()
            .then(queensList => {
                setFormState(oldState => ({...oldState, playerQueens: new Array(queensList.length).fill(false)}));
                setQueens(queensList);
            })
        )
        .catch(err => console.log(err));
    }, [])

    return (
        <div className="pageContainer">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label className="formLabel formText">Name
                    <input type="text" value={formState.name} id="name" name="name" onChange={handleNameChange}/>
                </label>
                <div className="formLabel formCheckboxContainer">
                    <p className="checkboxLabel">Choose 5 Queens</p>
                    {queens.map((queen, idx) => {
                        return (
                            <label key={queen.queen_id} className="formCheckbox"> 
                                <input type="checkbox" id={idx} name="queen" value={queen.queen_name} checked={formState.playerQueens[idx]} onChange={() => handleCheckChange(idx)}/>
                                <p>{queen.queen_name}</p>
                            </label>
                        )
                    })}
                </div>
                <input type="submit" value="Submit"/>
            </form>
        </div>
    )
}

export default PlayerSignup

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Nav from "./components/Nav.jsx"
import LeaderBoard from "./components/LeaderBoard.jsx"
import Queens from "./components/Queens.jsx"
import QueenInfoContainer from "./components/QueenInfoContainer.jsx"
import Admin from "./components/Admin.jsx"
import PlayerSignup from "./components/PlayerSignup.jsx";
import Players from "./components/Players.jsx"
import Weeks from "./components/Weeks.jsx"
import About from "./components/About.jsx"
import "./app.css"

const RouterContainer = () => {
    return (
        <Router>
            <Nav />
            <Routes>
                <Route exact path="/" element={<LeaderBoard />}/>
                <Route path="/admin" element={<Admin />}/>
                <Route exact path="/queens" element={<Queens />}/>
                <Route path="/queens/:queenid" element={<QueenInfoContainer />}/>
                <Route path="/signup" element={<PlayerSignup />}/>
                <Route path="/players" element={<Players />}/>
                <Route path="/weeks" element={<Weeks />}/>
                <Route path="/rules" element={<About />}/>
            </Routes>
        </Router>
    )
}

export default RouterContainer

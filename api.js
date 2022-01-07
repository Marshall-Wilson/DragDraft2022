const express = require('express'); // import express module (simplifies routing/requests, among other things)
const cors = require('cors'); // import the CORS library to allow Cross-origin resource sharing
const bodyParser = require('body-parser');
const app = express(); // create an instance of the express module (app is the conventional variable name used)
const updateScores = require('./services.js')

const PORT = process.env.PORT || 9000; // use either the host env var port (PORT) provided by Heroku or the local port (5000) on your machine

const pool = require('./db.js');

app.use(cors()); // Enable CORS 
app.use(express.json()); // Recognize Request Objects as JSON objects

//app.use('/', express.static('client/build'));

// Get All Queens
app.get('/api/queens', (req, res) => {
    pool.query("SELECT * FROM queens;")
        .then(queens => {
            res.send(queens.rows);
        })
        .catch(err => console.log(err));
});

// Get One Queen
app.get('/api/queens/:queenid', (req, res) => {
    pool.query("SELECT * FROM queens WHERE queen_id = $1", [req.params.queenid])
        .then(queen => res.send(queen.rows[0]))
        .catch(err => console.log(err));
});

// Post New Queen
app.post('/api/queens', (req, res) => {
    const body = req.body;
    const values = [body.queen_name, body.maxi_wins, body.mini_wins, body.ls_wins, body.top_three, body.winner, body.elim_week, body.total_points];
    pool.query("INSERT INTO queens (queen_name, maxi_wins, mini_wins, ls_wins, top_three, winner, elim_week, total_points) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;", values)
        .then(newQueen => res.send(newQueen))
        .catch(err => res.status(500).send(err));
});

// Get All Weeks
app.get('/api/weeks', (req, res) => {
    pool.query("SELECT * FROM weeks;")
        .then(weeks => res.send(weeks.rows))
        .catch(err => res.status(500).send(err));
});

// Get Specific Week 
app.get('/api/weeks/:weekid', (req, res) => {
    pool.query("SELECT * FROM weeks WHERE week_id = $1", [req.params.weekid])
        .then(week => res.send(week.rows[0]))
        .catch(err => res.status(500).send(err));
});


// Post New Week Results (update queens and players as appropriate)
app.post('/api/weeks', (req, res) => {
    const body = req.body;
    const values = [body.week, body.maxiWinners, body.miniWinners, body.lsWinners, body.elims, body.topThree, body.winner]
    pool.query("INSERT INTO weeks (week_number, maxi_winner, mini_winner, ls_winner, elims, top_three, winner) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;", values)
        .then(newWeek => {
            updateScores(newWeek.rows[0])
                .then(message => res.send(newWeek.rows[0]));
        })
        .catch(err => res.status(500).send(err));
});


// Get All Players
app.get('/api/players', (req, res) => {
    pool.query("SELECT * FROM players;")
        .then(players => res.send(players.rows))
        .catch(err => res.status(500).send(err));
})

// Get Specific Player
app.get('/api/players/:playerid', (req, res) => {
    pool.query("SELECT * FROM players WHERE player_id = $1", [req.params.playerid])
        .then(player => res.send(player.rows[0]))
        .catch(err => res.status(500).send(err));
});

// Post New Player
app.post('/api/players', (req, res) => {
    const values = [req.body.name, req.body.playerQueens, 0];
    pool.query("INSERT INTO players (player_name, player_queens, player_points) VALUES ($1, $2, $3) RETURNING *;", values)
        .then(new_player => res.send(new_player.rows[0]))
        .catch(err => res.status(500).send(err));

});

//app.use('*', express.static('client/build'));


app.listen(PORT, () => { // start server and listen on specified port
    console.log(`App is running on ${PORT}`) // confirm server is running and log port to the console
})
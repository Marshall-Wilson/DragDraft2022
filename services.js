const pool = require('./db.js');

// Update queen scores and player scores based on the accomplishments from a week
const updateScores = (week) => {
    return new Promise(async(resolve, reject) => {
        await updateQueens(week);
        await updatePlayers();
        resolve("Scores Updated");
    })
}

// Update all db queen entries with the accomplishments from a week
const updateQueens = async(week) => {
    const queens = await pool.query("SELECT * FROM queens;");
    // for each queen
    for (let queen of queens.rows) {
        // update relevant fields
        if (week.elims.includes(queen.queen_id)) {
            queen.elim_week = week.week_number;
        }
        if (week.maxi_winner.includes(queen.queen_id)) {
            queen.maxi_wins += 1
        }
        if (week.mini_winner.includes(queen.queen_id)) {
            queen.mini_wins += 1
        }
        if (week.ls_winner.includes(queen.queen_id)) {
            queen.ls_wins += 1
        }
        if (week.top_three.includes(queen.queen_id)) {
            queen.top_three += 1
        }
        if (week.winner.includes(queen.queen_id)) {
            queen.winner += 1
        }

        // update queen in db
        const values = [queen.maxi_wins, queen.mini_wins, queen.ls_wins, queen.top_three, queen.winner, queen.elim_week, queenScore(queen), queen.queen_id]
        await pool.query("UPDATE queens SET maxi_wins = $1, mini_wins = $2, ls_wins = $3, top_three = $4, winner = $5, elim_week = $6, total_points = $7 WHERE queen_id = $8", values);
    }
}

// Update all player entries in db to have player_points equal to the sum of 
// each player's set of queens. 
const updatePlayers = async() => {
    const players = await pool.query("SELECT * FROM players;");
    const queens = await pool.query("SELECT * FROM queens;");

    // Sum points for all queens in a player's roster
    for (let player of players.rows) {
        let score = 0;
        for (let queen of queens.rows) {
            if (player.player_queens.includes(queen.queen_id)) {
                score += queen.total_points;
            }
        }
        // Update player in db
        await pool.query("UPDATE players SET player_points = $1 WHERE player_id = $2", [score, player.player_id]);
    }
}

// Calculate a queen's score based on their accomplishments
const queenScore = (queen) => {
    return (3 * queen.maxi_wins) + (1 * queen.mini_wins) + (2 * queen.ls_wins) + (3 * queen.top_three) + (5 * queen.winner);
}


module.exports = updateScores;
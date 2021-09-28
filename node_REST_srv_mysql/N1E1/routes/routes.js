//Requireds and instance
const express = require('express');
const gameCtrl=require('../controllers/gameCtrl');
const routes = express.Router();


//------------------ROUTING----------------------------------------------------


//Create PLAYERS
routes.post('/players', gameCtrl.signUp)
//Update player's NAME
routes.put('/players', gameCtrl.renamePlayer)
//Rolling the Dice!
routes.post('/players/:id/games', gameCtrl.rollTheDices)
//Delete all player's games
routes.delete('/players/:id/games', gameCtrl.deleteGames)
//List of players
routes.get('/players', gameCtrl.readAllPlayers)
//List of Player's Games
routes.get('/players/:id/games', gameCtrl.readAllGames)
// Players Average Success
routes.get('/players/ranking', gameCtrl.rankingAllPlayers)
//Best Player
routes.get('/players/ranking/winner', gameCtrl.readWinner)
//Worst Player
routes.get('/players/ranking/loser',gameCtrl.readLoser)

module.exports=routes;
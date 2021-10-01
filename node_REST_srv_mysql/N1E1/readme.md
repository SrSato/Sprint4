# Node REST Server - MySQL

REST API server for a dice game... Roll 2d6. If you get 7 you win.

## Dependences

You need the following software installed and configured in order to use this server:
- [x] NodeJs
- [x] MySQL or similar (Your version of choice of SQL server)

## Install

- [x] Clone or download this repo into your chosen folder.
- [x] In that folder (A.K.A "Main Folder" for now on), go CLI and run:
```
npm install
```
- [x] Make a subfolder named **config**.
- [x] Make a file named **db.config.js** in that subfolder.
- [x] Write this in that file, but change XXXX for your appropriate values: 
```javascript 
dbConfig = {
  HOST: "XXXXXXX",
  PORT: "XXXX",
  USER: "XXXXX",
  PASSWORD: "XXXXX",
  DB: "XXXX",
  dialect: "XXXX",
};

module.exports=dbConfig;
```
- [x] In main folder, go CLI and run:
```
node server.js
```
- [x] Enjoy!

## Using the API (End Points)

Nowadays this API has the following end points:

- POST '/players' :arrow_right: Sign up for new players 
- PUT '/players' :arrow_right: Update player's NAME
- POST '/players/:id/games' :arrow_right: Rolling the Dice!
- DELETE '/players/:id/games' :arrow_right: Delete all player's games
- GET '/players' :arrow_right: List of players
- GET '/players/:id/games' :arrow_right: List of Player's Games
- GET '/players/ranking' :arrow_right: Players Average Success
- GET '/players/ranking/winner' :arrow_right: Best Player
- GET '/players/ranking/loser' :arrow_right: Worst Player

You can observe the API at work with this postman collection:

```
/Sprint4/node_REST_srv_mysql/N1E1/sprint4-n1e1.postman_collection.json
```

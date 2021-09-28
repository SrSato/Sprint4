const Player = require('../models/player');
const Game = require('../models/game');

async function nameInUse(name){

  if(name==undefined || name==""){
    return false;
  }

  const doppleganger = await Player.findOne({ where: { name: name} });

  return doppleganger === null ? false : true;

}

async function signUp (req, res) {
  try{

    const nameToSearch= req.body.name || ""; 

    if (await nameInUse(nameToSearch)==false){
      const player = Player.build({
        name: req.body.name,
      })
   
      player.save()
      return res.status(200).send({ success: true, result: `A user named ${nameToSearch||"Anonymus"} has been created.`});
      
    }else{
      return res.status(400).send({ success: false, message: `You need a new nick! A user named ${nameToSearch} is already in the DB!` });
    }

  }
  catch(err){

    const error = handleError(err);
    res.status(500).json(error);

  }
}

async function renamePlayer(req,res){
  try{

    const nameToSearch= req.body.oldName || "";
    const newName=req.body.newName;

    if(nameToSearch==undefined||nameToSearch==""){
      return res.status(400).send({ success: false, message: `The current user name must be informed` });
    }
    if (!await nameInUse(nameToSearch)){
      return res.status(400).send({ success: false, message: `There isn't a user named ${nameToSearch} in the DB!` });
    }
    if(newName==undefined||newName==""){
      return res.status(400).send({ success: false, message: `The new user name must be informed` });
    }
    if (await nameInUse(newName)){
      return res.status(400).send({ success: false, message: `You need a new nick! A user named ${nameToSearch} is already in the DB!` });
    }

    player=await Player.findOne({ where: { name: nameToSearch } });
    player.update({name: newName});
    return res.status(200).send({ success: true, message: `The user known as ${nameToSearch} now is ${newName}`})

  }
  catch(err){

    const error = handleError(err);
    res.status(500).json(error);

  }
}  

async function rollTheDices(req,res){
  try{

    const idToSearch=req.params.id || "";
    player=await Player.findByPk(idToSearch);

    if(player===null){
      return res.status(400).send({ success: false, message: `There isn't a user with id:${idToSearch} in the DB!` });
    }

    const dice1 = Math.floor( Math.random() * 6 ) + 1;
    const dice2 = Math.floor( Math.random() * 6 ) + 1;
    const diceTotal = dice1 + dice2;
    const score = diceTotal == 7 ? "WIN" : "LOSS";

    const game = Game.build({
        playerId: idToSearch,
        dice1: dice1,
        dice2: dice2,
        score: score
    });
    await game.save();

    const totalGames = await Game.count({ where: {playerId: idToSearch} });
    const wins = await Game.count({ where: {playerId: idToSearch, score: "WIN"} });
    const average = Math.floor(((wins/totalGames)*100));
    await player.update({average: average});
  

    res.status(200).send({ success: true, result: {dice1,dice2,score,average} });

  }
  catch(err){

    const error = handleError(err);
    res.status(500).json(error);

  }

}

async function deleteGames(req,res){
  try{

    const idToSearch=req.params.id || "";
    player=await Player.findByPk(idToSearch);

    if(player===null){
      return res.status(400).send({ success: false, message: `There isn't a user with id:${idToSearch} in the DB!` });
    }

    const games = await Game.destroy({where:{playerId: idToSearch} });
    return res.status(200).send({ success: true, message:`All the ${player.name}'s games have been deleted` })
  
  }
  catch(err){

    const error = handleError(err);
    res.status(500).json(error);

  }
}

async function readAllGames(req,res){

  try{

    const idToSearch=req.params.id || "";
    player=await Player.findByPk(idToSearch);

    if(player===null){
      return res.status(400).send({ success: false, message: `There isn't a user with id:${idToSearch} in the DB!` });
    }

    const games = await Game.findAll({where:{playerId: idToSearch} });
    return res.status(200).send({ success: true, message:`All ${player.name}'s games:`, result:games});

  }
  catch(err){

    const error = handleError(err);
    res.status(500).json(error);

  }
}

async function readAllPlayers(req,res){
  try {

    let players = await Player.findAll({attributes: ['name', 'average']});
    res.status(200).send({ success: true, result: players })

  }
  catch(err){

    const error = handleError(err);
    res.status(500).json(error);

  }
}

async function rankingAllPlayers(req,res){
  try {

    let players = await Player.findAll({attributes: ['name', 'average'],order: [
        ['average','DESC']
      ]});
    res.status(200).send({ success: true, result: players })

  }
  catch(err){

    const error = handleError(err);
    res.status(500).json(error);

  }
}
  
async function readWinner(req,res){
  try{

    const ranking = await Player.findAll({ order: [
        ['average','DESC']
      ]
    });
    res.status(200).send({success:true, result: ranking[0]});

  }
  catch(err){

    const error = handleError(err);
    res.status(500).json(error);

  }
}  

async function readLoser(req,res){
  try{

    const ranking = await Player.findAll({ order: [
        ['average','DESC']
      ]
    });
    res.status(200).send({success:true, result: ranking[ranking.length-1]});

  }
  catch(err){

    const error = handleError(err);
    res.status(500).json(error);

  }
}

function handleError(err, res){
    const error = {
        message : 'A wild error appeared!!',
        error : err.message,
    };
    console.log(err);
    return error
}

module.exports = {
  signUp,
  renamePlayer,
  readAllPlayers,
  rollTheDices,
  deleteGames,
  readAllGames,
  rankingAllPlayers,
  readWinner,
  readLoser
}
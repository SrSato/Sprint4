const Player = require('../models/player');

async function nameInUse(name){

  if(name==undefined || name==""){
    return false;
  }

  const doppleganger = await Player.exists({ "name" : name });

  return doppleganger;

}

async function signUp (req, res) {
  try{

    const nameToSearch= req.body.name || ""; 

    if (await nameInUse(nameToSearch)==false){
      const player = new Player({
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

    await Player.findOneAndUpdate(
      { "name": nameToSearch},
      { "name": newName },
      { new: true });

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
    let player=await Player.findById(idToSearch);

    if(player===null){
      return res.status(400).send({ success: false, message: `There isn't a user with id:${idToSearch} in the DB!` });
    }

    const dice1 = Math.floor( Math.random() * 6 ) + 1;
    const dice2 = Math.floor( Math.random() * 6 ) + 1;
    const diceTotal = dice1 + dice2;
    const score = diceTotal == 7 ? "WIN" : "LOSS";

    player.games = [...player.games, [dice1, dice2, score]];
    await Player.updateOne({_id: idToSearch}, {games : player.games});

    player=await Player.findById(idToSearch);
    const totalGames = player.games.length;
    const wins = player.games.filter(x => x[2]=='WIN').length;
    const average = Math.floor(((wins/totalGames)*100));
    await Player.updateOne({_id: idToSearch},{average: average});
  

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
    player=await Player.findById(idToSearch);

    if(player===null){
      return res.status(400).send({ success: false, message: `There isn't a user with id:${idToSearch} in the DB!` });
    }

    await Player.updateOne({_id: idToSearch}, {games : [], average: 0})
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
    player=await Player.findById(idToSearch);

    if(player===null){
      return res.status(400).send({ success: false, message: `There isn't a user with id:${idToSearch} in the DB!` });
    }

    const games = player.games;
    return res.status(200).send({ success: true, message:`All ${player.name}'s games:`, result:games});

  }
  catch(err){

    const error = handleError(err);
    res.status(500).json(error);

  }
}

async function readAllPlayers(req,res){
  try {

    let players = await Player.find({attributes: ['name', 'average']});
    res.status(200).send({ success: true, result: players })

  }
  catch(err){

    const error = handleError(err);
    res.status(500).json(error);

  }
}

async function rankingAllPlayers(req,res){
  try {

    let players = await Player.find({},'name average').sort({average:-1});
    res.status(200).send({ success: true, result: players })

  }
  catch(err){

    const error = handleError(err);
    res.status(500).json(error);

  }
}
  
async function readWinner(req,res){
  try{

    const ranking = await Player.find({}).sort({average:-1});
    res.status(200).send({success:true, result: ranking[0]});

  }
  catch(err){

    const error = handleError(err);
    res.status(500).json(error);

  }
}  

async function readLoser(req,res){
  try{

   const ranking = await Player.find({}).sort({average:1});
    res.status(200).send({success:true, result: ranking[0]});

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
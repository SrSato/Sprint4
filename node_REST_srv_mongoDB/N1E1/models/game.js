const db=require('./db');
const Player=require('./player');
const Game = db.sequelize.define('Game', {
   
    id: {
      type: db.Sequelize.UUID,
      defaultValue: db.Sequelize.UUIDV4, // Or Sequelize.UUIDV1
      primaryKey: true
    },
    playerId: {
      type: db.Sequelize.UUID,
      references: {
        // This is a reference to another model
        model: Player,

        // This is the column name of the referenced model
        key: 'id'
      }
    },
    dice1: {
      type: db.Sequelize.INTEGER,
      defaultValue: 1
    },
    dice2: {
      type: db.Sequelize.INTEGER,
      defaultValue: 1
    },
    score: {
      type: db.Sequelize.STRING,
      defaultValue: "LOSS"
    }

});

module.exports=Game;
const db=require('./db');
const Player = db.sequelize.define('Player', {
   
    id: {
      type: db.Sequelize.UUID,
      defaultValue: db.Sequelize.UUIDV4, // Or Sequelize.UUIDV1
      primaryKey: true
    },
    name: {
      type: db.Sequelize.STRING,
      allowNull: true,
      defaultValue: 'Anonymus'
    },
    average: {
      type: db.Sequelize.INTEGER,
      defaultValue: 0
    }

});

module.exports=Player;
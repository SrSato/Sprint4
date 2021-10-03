const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playerSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  average: {
    type: Number,
    required: true,
    default: 0
  },
  games: {
    type: [],
    required: false,
  }
},{ timestamps: true });


const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
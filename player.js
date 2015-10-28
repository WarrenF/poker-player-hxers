
module.exports = {

  VERSION: "Awesome JS player",

  bet_request: function(game_state, bet) {
    var me = game_state.players[game_state.in_action];
    var betAmount = game_state.current_buy_in - me.bet + 1;
    bet(betAmount);
  },

  showdown: function(game_state) {

  }
};

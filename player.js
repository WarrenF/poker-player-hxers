/*function getCards( game_state ) {
  var me = game_state.players[game_state.in_action];
  var myCards = me.hole_cards;
  
}; */


module.exports = {

  VERSION: "Awesome JS player",

  bet_request: function(game_state, bet) {
    var play = Math.floor( Math.random( ) * 10 );
    if( play > 3 ) {
      bet( 0 );
      return;
    }
    var me = game_state.players[game_state.in_action];
    var betAmount = game_state.current_buy_in - me.bet + game_state.minimum_raise;
    bet(betAmount);
  },

  showdown: function(game_state) {

  }
};

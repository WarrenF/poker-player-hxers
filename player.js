cardsSetup = {
  getRank: function( rank ) {
    if( rank !== 'K' || rank !== 'Q' || rank !== 'J' || rank !== 'A' ) return rank;
    switch( rank ) {
      case 'A':
        return '14';
        break;
      case 'K':
        return '13';
        break;
      case 'Q':
        return '12';
        break;
      case 'J':
        return '11';
        break;
    }
  },
  
  pair: function( cards ) {
    if( ! cards ) return false;
    if( cards[0].rank == cards[1].rank ) return true;
  },
  
  suit: function( cards ) {
    if( ! cards ) return false;
    if( cards[0].suit == cards[1].suit ) return true;
  },
  
  distance: function( cards ) {
    if( ! cards ) return false;
    if( ( this.getRank( cards[0].rank ) - this.getRank( cards[1].rank ) ) > 5 ) return true;
    if( ( this.getRank( cards[1].rank ) - this.getRank( cards[0].rank ) ) > 5 ) return true;
    return false;
  },
  
  getCards: function( game_state ) {
    var me = game_state.players[game_state.in_action];
    var myCards = me.hole_cards;
    this.pair( myCards );
  },
};

module.exports = {

  VERSION: "Awesome JS player",

  bet_request: function(game_state, bet) {
    var me = game_state.players[game_state.in_action];
    var betAmount = game_state.current_buy_in - me.bet;
    var myCards = me.hole_cards;
    /*var randomPlay = Math.floor( Math.random( ) * 10 );
    
    if( cardsSetup.distance( myCards )) {
      bet( 0 );
      return;
    }*/
    
    if( cardsSetup.pair( myCards )) {
      bet( betAmount );
      return;
    }
    
    if( cardsSetup.suit( myCards )) {
      bet( betAmount );
      return;
    }
    bet( 0 );
  },

  showdown: function(game_state) {

  }
};

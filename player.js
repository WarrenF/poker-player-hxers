var cardLogic = require( './cardLogic' );

cardsSetup = {
  getRank: function( rank ) {
    if( rank !== 'K' && rank !== 'Q' && rank !== 'J' && rank !== 'A' ) return rank;
    switch( rank ) {
      case 'A':
        return 14;
        break;
      case 'K':
        return 13;
        break;
      case 'Q':
        return 12;
        break;
      case 'J':
        return 11;
        break;
    }
  },
  
  pair: function( cards ) {
    if( ! cards ) return false;
    if( cards[0].rank == cards[1].rank ) return true;
  },
  
  suit: function( myCards, cards ) {
    if( ! cards ) return false;
    if( myCards[0].suit !== myCards[1].suit ) return false;
    if( ! cards.length ) return true;
    if( cards[0].suit === myCards[0].suit && cards.length === 3 ) return true;
    if( cards[1].suit === myCards[0].suit && cards.length === 3 ) return true;
    if( cards[2].suit === myCards[0].suit && cards.length === 3 ) return true;
    return false;
  },
  
  distance: function( cards ) {
    if( ! cards ) return false;
    if( ( this.getRank( cards[0].rank ) - this.getRank( cards[1].rank ) ) > 5 ) return true;
    if( ( this.getRank( cards[1].rank ) - this.getRank( cards[0].rank ) ) > 5 ) return true;
    return false;
  },
  
  goodCard: function( cards ) {
    if( ! cards ) return false;
    if( this.getRank( cards[0].rank ) >= 10 ) return true; 
    if( this.getRank( cards[1].rank ) >= 10 ) return true; 
    return false;
  },
  
  goodCards: function( cards ) {
    if( ! cards ) return false;
    if( this.getRank( cards[0].rank ) >= 10 && this.getRank( cards[1].rank ) >= 10 ) return true; 
    return false;
  },
  
  getCards: function( game_state ) {
    var me = game_state.players[game_state.in_action];
    var myCards = me.hole_cards;
    this.pair( myCards );
  },
};

module.exports = {

  VERSION: "AI - Learning in progress...",

  bet_request: function(game_state, bet) {
    var me = game_state.players[game_state.in_action];
    var betAmount = game_state.current_buy_in - me.bet + game_state.minimum_raise;
    var gameCards = game_state.community_cards ? game_state.community_cards : [ ];
    var myCards = me.hole_cards;
    var gameHand = cardLogic.sortCards( myCards, gameCards );
    var tableHand = cardLogic.sortCards( [ ], gameCards );
    if( ! tableHand.value ) tableHand = { value: 1 };
    /*var randomPlay = Math.floor( Math.random( ) * 10 );
    
    if( cardsSetup.distance( myCards )) {
      bet( 0 );
      return;
    }*/
    
    if( betAmount >= ( ( me.stack + me.bet ) * 0.8 ) && me.stack > 300 ) {
      bet( 0 );
      return;
    }
    
    // Post flop logic
    if( gameCards.length === 4 ) {
      bet( betAmount );
      return;
    }
    if( gameHand.value && tableHand.value && tableHand.value < gameHand.value ) {
      if( gameHand.value > 16000 ) {
        bet( me.stack );
        return;
      } else if( gameCards.length > 3 && gameHand.value > 12000 ) {
        bet( betAmount );
        return;
      } else if( gameHand.value > 10000 ) {
        bet( betAmount );
        return;
      }
    } else {
    // Pre flop logic
      if( cardsSetup.pair( myCards )) {
        bet( betAmount );
        return;
      }
      
      if( cardsSetup.goodCards( myCards ) ) {
        bet( betAmount );
        return;
      }
      
      if( cardsSetup.goodCard( myCards ) && ! me.bet ) {
        bet( betAmount );
        return;
      }
    
      /*if( cardsSetup.suit( myCards, gameCards )) {
        bet( betAmount );
        return;
      }*/
    }
    bet( 0 );
  },

  showdown: function(game_state) {

  }
};

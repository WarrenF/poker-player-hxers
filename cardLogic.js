var pokerEval = require( 'poker-evaluator' );

module.exports = {
  cardRank: function( rank ) {
    if( rank === '10' ) return 'T';
    return rank;
  },

  sortCards: function( cards, gameCards ) {
    if( ! cards.length || ! gameCards.length ) return false;
    var cardLength = (cards.length + gameCards.length);
    if( cardLength !== 3 && cardLength !== 5 && cardLength !== 7 ) return false;
    var self = this;
    var newCards = [ ];
    cards.forEach( function( card ) {
      newCards.push( self.cardRank( card.rank ) + card.suit.substr( 0, 1 ) );
    } );
    gameCards.forEach( function( card ) {
      newCards.push( self.cardRank( card.rank ) + card.suit.substr( 0, 1 ) );
    } );
    return pokerEval.evalHand( newCards );
  }
};

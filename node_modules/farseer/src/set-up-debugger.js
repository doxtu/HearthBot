import debug from 'debug';
// Define some debug logging functions for easy and readable debug messages.
export default function() {
  return {
    main: debug('HLW'),
    gameStart: debug('HLW:game-start'),
    zoneChange: debug('HLW:zone-change'),
    gameOver: debug('HLW:game-over')
  }
} 

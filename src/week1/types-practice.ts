// Challenge 1: Define a Player interface
// TODO: Create an interface for a basketball player with:
// - name (string)
// - position (should only be 'PG' | 'SG' | 'SF' | 'PF' | 'C')
// - stats (object with points, rebounds, assists as numbers)
// - isActive (boolean, optional)

// Your code here:

interface Player {
  name: string;
  position: 'PG' | 'SG' | 'SF' | 'PF' | 'C'
  stats: { 
    points: number;
    rebounds: number; 
    assists: number;
  }
  isActive?: boolean;
}

const player: Player = {
  name: 'Baron Davis',
  position: 'PG',
  stats: {
    points: 16.1,
    rebounds: 3.8,
    assists: 7.2
  },
  isActive: false
}

// Challenge 2: Create a Game type
// TODO: Define a type that represents a basketball game
// - homeTeam and awayTeam (strings)
// - homeScore and awayScore (numbers)
// - date (string)
// - isFinished (boolean)

// Your code here:

type Game = {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  isFinished: boolean;
}

// Challenge 3: Practice with arrays and unions
// TODO: Create a function that takes an array of Player positions
// and returns only the guard positions ('PG' | 'SG')

// Your code here:

function getGuards(positions: ('PG' | 'SG' | 'SF' | 'PF' | 'C')[]) {
  return positions.filter(p => p === 'PG' || p === 'SG')
}


const result = getGuards(['PG', 'SG', 'SF', 'PF', 'C'])
console.log(result) // ['PG', 'SG']


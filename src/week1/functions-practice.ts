// ============================================
// SECTION 1: FUNCTION BASICS (20 minutes)
// ============================================

// TODO 1: Create typed functions for basketball stats
// Create functions with proper parameter and return types:

// Function 1: Calculate shooting percentage
// Parameters: made shots (number), attempted shots (number)
// Returns: percentage as number
function calculateShootingPercentage(madeShots: number, attempedShots: number): number {
  const shootingPercentage = (madeShots / attempedShots) * 100
  return shootingPercentage
}


// Function 2: Determine if team qualifies for playoffs
// Parameters: wins (number), losses (number), minWinRate (number, default 0.6)
// Returns: boolean
function qualifiesForPlayoffs(wins: number, losses: number, minWinRate:number = 0.6): boolean {
  let makePlayoffs
  const winRate = wins / Math.trunc(wins + losses) * 100
  // Truncating a number to a specific decimal place 
  const truncWinRate = (Math.trunc(winRate * 10) / 10)
  
  return makePlayoffs = truncWinRate > minWinRate * 100 ? true : false
}

// Test your functions:
console.log('1. Function Tests:');
console.log('Shooting %:', calculateShootingPercentage(8, 10)); // Should be 80
console.log('Qualifies:', qualifiesForPlayoffs(50, 32)); // Should be true (60.9%)
console.log('');

// ============================================
// SECTION 2: GENERIC FUNCTIONS INTRO (25 minutes)
// ============================================

// TODO 2: Create your first generic function
// This function should work with ANY type of array and return the first item

// Your generic function here (if you have a function that has some type of data inside where you want the data to be 
// changing it's type based on what you passed in or what you return):
function getFirstItem<T>(items: T[]): T | undefined {
  if (items.length > 0) {
    return items[0]
  }
  return undefined
}

// Test with different types:
console.log('2. Generic Function Tests:');
const numbers = [1, 2, 3, 4, 5];
const players = ['LeBron', 'Curry', 'Durant'];
const scores = [{ team: 'Lakers', points: 108 }, { team: 'Warriors', points: 102 }];

console.log('First number:', getFirstItem(numbers)); // Should be 1
console.log('First player:', getFirstItem(players)); // Should be 'LeBron'
console.log('First score:', getFirstItem(scores)); // Should be the Lakers object
console.log('Empty array:', getFirstItem([])); // Should be undefined
console.log('');

// TODO 3: Generic function with constraints
// Create a function that works with objects that have a 'length' property

function getItemWithLength<T extends { length: number }>(item: T): string {
  return `${typeof(item)} has length: ${item.length}`
}

console.log(getItemWithLength('Hello')); // String has length
console.log(getItemWithLength([1, 2, 3, 4])); // Array has length
console.log(getItemWithLength({ length: 10, name: 'test' })); // Custom object

// ============================================
// SECTION 3: PRACTICAL SPORTS UTILITIES (30 minutes)
// ============================================

// TODO 4: Generic data processor (like the example from the framework)
// This is the core function you'll use throughout your sports betting career!

function processData<T>(
  data: T[],
  processor: (item: T) => boolean
): T[] {
  return data.filter(processor)
}

// Test 1: Filter numbers greater than 100
const gameScores = [95, 108, 112, 87, 99, 105];
const highScoringGames = processData(gameScores, score => score > 100);
console.log('High scoring games:', highScoringGames); // Should be [108, 112, 105]

// Test 2: Filter players by position
interface Player {
  name: string;
  position: 'PG' | 'SG' | 'SF' | 'PF' | 'C';
  points: number;
}

const teamRoster: Player[] = [
  { name: 'Baron Davis', position: 'PG', points: 16.1 },
  { name: 'Kobe Bryant', position: 'SG', points: 25.0 },
  { name: 'Derrick Rose', position: 'PG', points: 17.4 },
  { name: 'Allen Iverson', position: 'PG', points: 26.7 }
];

const guards = processData(teamRoster, player => player.position === 'PG' || player.position === 'SG');
console.log('Guards:', guards.map(p => p.name)); // Should be ['Baron', 'Rose', 'Iverson]

const highScorers = processData(teamRoster, player => player.points > 24);
console.log('High scorers:', highScorers.map(p => p.name)); // Should be ['Kobe', 'Iverson']

// ============================================
// SECTION 4: ADVANCED GENERICS (25 minutes)
// ============================================

function transformData<TInput, TOutput>(
  data: TInput[],
  transformer: (item: TInput) => TOutput
): TOutput[] {
  // Should apply the transformer to each item and return new array
  return data.map(transformer)
}

// Transform players to just their names
const playerNames = transformData(teamRoster, player => player.name);
console.log('Player names:', playerNames);

// Transform players to their scoring averages (pretend these are season averages)
const scoringData = transformData(teamRoster, player => ({
  player: player.name,
  ppg: player.points,
  category: player.points > 25 ? 'Elite' : 'Good'
}));

console.log('Scoring data:', scoringData);

// TODO 6: Generic function with multiple constraints
// Create a function that works with objects that have both 'name' and 'points' properties

function findTopPerformer<T extends { name: string; points: number }>(
  items: T[],
  count: number = 1
): T[] {
  // Implementation:
  // 1. Sort by value (descending)
  const bestScorers = items.sort((a, b) => b.points - a.points).slice(0, count)
  // 2. Return top 'count' items
  return bestScorers
}

// Test with different object types:
// console.log('6. Top Performer Tests:');

const playerStats = [
  { name: 'Baron Davis', position: 'PG', points: 16.1 },
  { name: 'Kobe Bryant', position: 'SG', points: 25.0 },
  { name: 'Derrick Rose', position: 'PG', points: 17.4 },
  { name: 'Allen Iverson', position: 'PG', points: 26.7 }
];

const topScorer = findTopPerformer(playerStats, 1);
console.log('Top scorer:', topScorer[0].name);

const topThree = findTopPerformer(playerStats, 3);
console.log('Top 3 scorers:', topThree.map(p => p.name));


// ============================================
// CHALLENGE SECTION (30 minutes)
// ============================================

// TODO 7: Build a generic Sports Analytics Engine!
// This combines everything and gives you a taste of what you'll build later

interface GameData {
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  venue: string;
}

class SportsAnalyzer<TGameData extends GameData> {
  private games: TGameData[] = [];

  // TODO: Implement these methods using generics

  addGame(game: TGameData): void {
    // Add game to the games array
    this.games.push(game)
    console.log(this.games)
  }

  filterGames(predicate: (game: TGameData) => boolean): TGameData[] {
    return this.games.filter(predicate)
  }

  transformGames<TResult>(transformer: (game: TGameData) => TResult): TResult[] {
    // Use your transformData function or similar logic
  }

  getTeamRecord(teamName: string): { wins: number; losses: number; winRate: number } {

    const record = {
      wins: 0,
      losses: 0,
      winRate: 0
    }

    // filter object to return only the games lakers have played, from the sample games object below
    const data = this.games.filter(game => game.homeTeam === teamName || game.awayTeam === teamName)
    
    // Calculate wins/losses for a team
    for (const t of data) {
      // if lakers are hometeam (and score more points) or away (and score more points)
       if (t.homeTeam === teamName && t.homeScore > t.awayScore || t.awayTeam === teamName && t.awayScore > t.homeScore) {
        console.log(teamName)
        record.wins++
       } else {
        // then they got outscored 
        record.losses++
      }
    }
    
  record.winRate = (record.wins / data.length) * 100
  // record will return { wins: 2. losses: 0, winRate: 100 }
  return record
}


  getAverageScore(teamName: string, isHome: boolean): number {
    // Calculate average score for a team at home or away
  }
}

// Test your Sports Analyzer:
const analyzer = new SportsAnalyzer<GameData>();

const sampleGames: GameData[] = [
  { date: '2024-01-10', homeTeam: 'Lakers', awayTeam: 'Warriors', homeScore: 108, awayScore: 102, venue: 'Crypto.com Arena' },
  { date: '2024-01-12', homeTeam: 'Celtics', awayTeam: 'Lakers', homeScore: 95, awayScore: 110, venue: 'TD Garden' },
  { date: '2024-01-15', homeTeam: 'Warriors', awayTeam: 'Celtics', homeScore: 115, awayScore: 109, venue: 'Chase Center' }
];

sampleGames.forEach(game => analyzer.addGame(game));
const filteredGames = analyzer.filterGames(game => game.homeScore > game.awayScore)

console.log('7. Sports Analyzer Tests:');
console.log('Lakers record:', analyzer.getTeamRecord('Lakers'));


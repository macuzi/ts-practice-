// ============================================
// FUNCTIONS & GENERICS PRACTICE - Day 3-4
// ============================================

console.log('🔧 Starting Functions & Generics Practice!\n');

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

// Your generic function here:
function getFirstItem<T>(/* your parameters */): T | undefined {
  // Implementation: return first item or undefined if array is empty
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
  // Return a string describing the item and its length
  // Example: "Item has length: 5"
}

// Test it:
console.log('3. Length Function Tests:');
console.log(getItemWithLength('Hello')); // String has length
console.log(getItemWithLength([1, 2, 3, 4])); // Array has length
console.log(getItemWithLength({ length: 10, name: 'test' })); // Custom object
console.log('');

// ============================================
// SECTION 3: PRACTICAL SPORTS UTILITIES (30 minutes)
// ============================================

// TODO 4: Generic data processor (like the example from the framework)
// This is the core function you'll use throughout your sports betting career!

function processData<T>(
  data: T[],
  processor: (item: T) => boolean
): T[] {
  // Your implementation here
  // Should filter the array based on the processor function
}

// Test cases for your processData function:
console.log('4. Process Data Tests:');

// Test 1: Filter numbers greater than 100
const gameScores = [95, 108, 112, 87, 99, 105];
const highScoringGames = processData(gameScores, score => score > 100);
console.log('High scoring games:', highScoringGames); // Should be [108, 112, 105]

// Test 2: Filter players by position
interface
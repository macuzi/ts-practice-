import 'reflect-metadata';

// ============================================
// SECTION 1: BASIC ASYNC OPERATIONS (20 minutes)
// Practice Goal: Master fundamental async/await syntax
// ============================================

// TODO 1: Convert callback-style to async/await
// Challenge: Rewrite these callback patterns using async/await

// Simulate API delay
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// TODO: Convert this callback-style function to async/await
function fetchTeamStatsCallback(teamName: string, callback: (error: Error | null, data?: any) => void): void {
  setTimeout(() => {
    if (teamName === 'INVALID') {
      callback(new Error('Team not found'));
    } else {
      callback(null, {
        team: teamName,
        wins: Math.floor(Math.random() * 82),
        losses: Math.floor(Math.random() * 82),
        pointsPerGame: Math.round((Math.random() * 30 + 100) * 10) / 10
      });
    }
  }, 100);
}

// Your async version here:
async function fetchTeamStats(teamName: string): Promise<any> {
  // Convert the setTimeout to use delay()
  await delay(100)

  if (teamName === 'INVALID') {
    throw new Error("Team not found");
  }
  // Return data directly
  return {
    team: teamName,
    wins: Math.floor(Math.random() * 82),
    losses: Math.floor(Math.random() * 82),
    pointsPerGame: Math.round((Math.random() * 30 + 100) * 10) / 10
  }
}

// TODO 2: Basic error handling patterns
async function safeApiCall(): Promise<void> {
  try {
    // Test successful call
    const lakersStats = await fetchTeamStats('Lakers');
    console.log('Lakers Stats:', lakersStats);
    
    // Test error handling
    const invalidStats = await fetchTeamStats('INVALID'); // Should throw
    
  } catch (error) {
    console.error('Error caught:', error);
  }
  console.log('');
}

// TODO 3: Implement concurrent team stats fetching
// Challenge: Fetch stats for multiple teams at once

interface TeamStats {
  team: string;
  wins: number;
  losses: number;
  pointsPerGame: number;
  fetchTime: number;
}

async function fetchMultipleTeamStats(teamNames: string[]): Promise<TeamStats[]> {
  // Implementation challenge:
  // 1. Use Promise.all() to fetch all teams concurrently
  // 2. Add timing information to track performance
  // 3. Handle partial failures gracefully
  
  const startTime = Date.now();
  const endTime = Date.now();
  const duration = endTime - startTime;
  
  // Your implementation here:
  // Hint: Use Promise.all() with teamNames.map()
  const results = await Promise.all(
    teamNames.map(async (team) => {
      try {
        return await fetchTeamStats(team)
      } catch (error) {
        return null
      }
    })
  )
  console.log(`Fetched the results in ${duration}ms ${JSON.stringify(results, null, 2)}`);
  
  return results; // Replace with actual implementation
}

// TODO 4: Advanced concurrent patterns
async function fetchTeamStatsWithFallback(teamNames: string[]): Promise<TeamStats[]> {
  // Implementation challenge:
  // 1. Use Promise.allSettled() instead of Promise.all()
  // 2. Handle both fulfilled and rejected promises
  // 3. Provide fallback data for failed requests
  
  // Your implementation here:
  
  return [];
}

// TODO 5: Racing patterns for fastest response
async function fetchFromMultipleSources(teamName: string): Promise<any> {
  // Implementation challenge:
  // Create multiple "API sources" and use Promise.race()
  // to get the fastest response
  
  const espnApi = async () => {
    await delay(Math.random() * 200 + 50); // 50-250ms
    return { source: 'ESPN', team: teamName, data: 'ESPN data' };
  };
  
  const nbaApi = async () => {
    await delay(Math.random() * 200 + 50); // 50-250ms  
    return { source: 'NBA.com', team: teamName, data: 'NBA.com data' };
  };
  
  const sportsRadarApi = async () => {
    await delay(Math.random() * 200 + 50); // 50-250ms
    return { source: 'SportsRadar', team: teamName, data: 'SportsRadar data' };
  };
  
  // Your implementation using Promise.race():
  
  return null;
}

async function testConcurrentOperations(): Promise<void> {
  console.log('2. Concurrent Operations Tests:');
  
  // Test Promise.all()
  const teams = ['Lakers', 'Warriors', 'Celtics', 'Heat'];
  const allStats = await fetchMultipleTeamStats(teams);
  console.log('All team stats:', allStats.length, 'teams fetched');
  
  // Test Promise.allSettled() 
  const mixedTeams = ['Lakers', 'INVALID', 'Warriors', 'INVALID2'];
  const settledStats = await fetchTeamStatsWithFallback(mixedTeams);
  console.log('Settled stats:', settledStats.length, 'results (including fallbacks)');
  
  // Test Promise.race()
  const fastestData = await fetchFromMultipleSources('Lakers');
  console.log('Fastest source:', fastestData?.source);
  
  console.log('');
}

// ============================================
// SECTION 3: RETRY LOGIC & RATE LIMITING (35 minutes)
// Practice Goal: Build resilient API calls for sports betting
// ============================================

// TODO 6: Implement exponential backoff retry
async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  // Implementation challenge:
  // 1. Try the operation
  // 2. If it fails, wait with exponential backoff (1s, 2s, 4s, 8s...)
  // 3. Retry up to maxRetries times
  // 4. Throw final error if all retries fail
  
  // Your implementation here:
  // Hint: Use a for loop and Math.pow(2, attempt) for backoff
  
  throw new Error('Not implemented');
}

// TODO 7: Rate-limited API client
class RateLimitedSportsAPI {
  private lastRequestTime: number = 0;
  private readonly minInterval: number; // Minimum ms between requests
  
  constructor(requestsPerSecond: number = 10) {
    this.minInterval = 1000 / requestsPerSecond; // Convert to ms interval
  }
  
  // Implementation challenge: Add rate limiting to API calls
  private async waitForRateLimit(): Promise<void> {
    // Your implementation:
    // 1. Calculate time since last request
    // 2. If too soon, wait the remaining time
    // 3. Update lastRequestTime
  }
  
  async fetchOdds(game: string): Promise<any> {
    await this.waitForRateLimit();
    
    // Simulate API call that might fail
    if (Math.random() < 0.3) { // 30% failure rate
      throw new Error(`Failed to fetch odds for ${game}`);
    }
    
    return {
      game,
      moneyline: { home: -150, away: +130 },
      spread: { line: -3.5, home: -110, away: -110 },
      total: { points: 215.5, over: -105, under: -115 },
      timestamp: new Date()
    };
  }
  
  // TODO 8: Combine retry logic with rate limiting
  async fetchOddsWithRetry(game: string): Promise<any> {
    // Implementation challenge:
    // Use your retryWithBackoff function with the fetchOdds method
    
    return null; // Replace with implementation
  }
}

async function testRetryAndRateLimit(): Promise<void> {
  console.log('3. Retry & Rate Limiting Tests:');
  
  const api = new RateLimitedSportsAPI(5); // 5 requests per second
  
  // Test rate limiting by making rapid requests
  const games = ['Lakers vs Warriors', 'Celtics vs Heat', 'Bulls vs Knicks'];
  
  console.log('Testing rate-limited requests...');
  const startTime = Date.now();
  
  for (const game of games) {
    try {
      const odds = await api.fetchOddsWithRetry(game);
      const elapsed = Date.now() - startTime;
      console.log(`${elapsed}ms: Got odds for ${game}`);
    } catch (error) {
      console.error(`Failed to get odds for ${game}:`,);
    }
  }
  
  console.log('');
}

// ============================================
// SECTION 4: STREAMING & REAL-TIME DATA (40 minutes)
// Practice Goal: Handle live odds updates and streaming data
// ============================================

// TODO 9: Simulate streaming odds data
class OddsStreamSimulator {
  private listeners: ((data: any) => void)[] = [];
  private isStreaming: boolean = false;
  
  // Implementation challenge: Create event-driven streaming
  startStream(): void {
    if (this.isStreaming) return;
    
    this.isStreaming = true;
    
    // Your implementation:
    // 1. Use setInterval to simulate live updates every 2 seconds
    // 2. Generate random odds changes
    // 3. Notify all listeners
    // 4. Sometimes simulate connections
  }
  
  stopStream(): void {
    this.isStreaming = false;
    // Clean up your interval here
  }
  
  onOddsUpdate(callback: (data: any) => void): void {
    this.listeners.push(callback);
  }
  
  removeListener(callback: (data: any) => void): void {
    const index = this.listeners.indexOf(callback);
    if (index > -1) {
      this.listeners.splice(index, 1);
    }
  }
}

// TODO 10: Build async iterator for streaming data
class AsyncOddsStream {
  private stream: OddsStreamSimulator;
  private buffer: any[] = [];
  private waiting: ((value: any) => void)[] = [];
  
  constructor() {
    this.stream = new OddsStreamSimulator();
    
    // Implementation challenge:
    // Set up the stream listener to populate buffer and resolve waiting promises
    this.stream.onOddsUpdate((data) => {
      // Your implementation here
    });
  }
  
  async *[Symbol.asyncIterator](): AsyncIterableIterator<any> {
    this.stream.startStream();
    
    try {
      while (true) {
        // Implementation challenge:
        // 1. If buffer has data, yield it
        // 2. Otherwise, wait for new data
        // 3. Handle cleanup when done
        
        yield await this.getNextOddsUpdate();
      }
    } finally {
      this.stream.stopStream();
    }
  }
  
  private async getNextOddsUpdate(): Promise<any> {
    // Implementation challenge:
    // Return next item from buffer, or wait for one
    
    return null; // Replace with implementation
  }
}

async function testStreamingData(): Promise<void> {
  console.log('4. Streaming Data Tests:');
  
  // Test basic streaming
  const simulator = new OddsStreamSimulator();
  
  let updateCount = 0;
  const handleUpdate = (data: any) => {
    updateCount++;
    console.log(`Update ${updateCount}:`, data.game, data.moneyline);
    
    // Stop after 3 updates
    if (updateCount >= 3) {
      simulator.stopStream();
    }
  };
  
  simulator.onOddsUpdate(handleUpdate);
  simulator.startStream();
  
  // Wait for updates to complete
  await delay(7000);
  
  // Test async iterator (advanced)
  console.log('\nTesting async iterator...');
  const asyncStream = new AsyncOddsStream();
  
  let iterationCount = 0;
  for await (const odds of asyncStream) {
    console.log('Streamed odds:', odds.game);
    iterationCount++;
    
    // Break after 2 iterations for demo
    if (iterationCount >= 2) break;
  }
  
  console.log('');
}

// ============================================
// SECTION 5: ERROR RECOVERY & RESILIENCE (30 minutes)
// Practice Goal: Build bulletproof data fetching
// ============================================

// TODO 11: Circuit breaker pattern
class CircuitBreaker {
  private failures: number = 0;
  private lastFailTime: number = 0;
  private state: 'CLOSED' | 'OPEN' | 'HALF_OPEN' = 'CLOSED';
  
  constructor(
    private maxFailures: number = 5,
    private timeout: number = 60000 // 1 minute
  ) {}
  
  async call<T>(operation: () => Promise<T>): Promise<T> {
    // Implementation challenge:
    // 1. If OPEN and timeout hasn't passed, throw immediately
    // 2. If OPEN and timeout passed, switch to HALF_OPEN
    // 3. If HALF_OPEN, try once and either go to CLOSED or OPEN
    // 4. If CLOSED, execute normally and track failures
    
    // Your implementation here:
    
    throw new Error('Circuit breaker not implemented');
  }
  
  private onSuccess(): void {
    this.failures = 0;
    this.state = 'CLOSED';
  }
  
  private onFailure(): void {
    this.failures++;
    this.lastFailTime = Date.now();
    
    if (this.failures >= this.maxFailures) {
      this.state = 'OPEN';
    }
  }
}

// TODO 12: Comprehensive resilient data fetcher
class ResilientSportsDataFetcher {
  private circuitBreaker: CircuitBreaker;
  private rateLimitedAPI: RateLimitedSportsAPI;
  
  constructor() {
    this.circuitBreaker = new CircuitBreaker(3, 30000); // 3 failures, 30 sec timeout
    this.rateLimitedAPI = new RateLimitedSportsAPI(10);
  }
  
  // Implementation challenge: Combine all resilience patterns
  async fetchGameData(game: string): Promise<any> {
    // Your implementation should:
    // 1. Use circuit breaker
    // 2. Use rate limiting  
    // 3. Use retry with backoff
    // 4. Provide graceful fallbacks
    
    return this.circuitBreaker.call(async () => {
      return await retryWithBackoff(async () => {
        return await this.rateLimitedAPI.fetchOddsWithRetry(game);
      }, 2, 500);
    });
  }
  
  // TODO 13: Batch processing with error isolation
  async fetchMultipleGamesResilently(games: string[]): Promise<Array<{ game: string; data?: any; error?: string }>> {
    // Implementation challenge:
    // 1. Process games concurrently but isolate errors
    // 2. Don't let one failure stop others
    // 3. Return both successes and failures with context
    
    // Your implementation using Promise.allSettled():
    
    return [];
  }
}

async function testErrorRecovery(): Promise<void> {
  console.log('5. Error Recovery Tests:');
  
  const fetcher = new ResilientSportsDataFetcher();
  
  // Test resilient single fetch
  try {
    const gameData = await fetcher.fetchGameData('Lakers vs Warriors');
    console.log('✅ Successfully fetched game data');
  } catch (error) {
    console.log('❌ All fallbacks failed:', error);
  }
  
  // Test batch processing with error isolation
  const games = ['Lakers vs Warriors', 'INVALID_GAME', 'Celtics vs Heat', 'ANOTHER_INVALID'];
  const results = await fetcher.fetchMultipleGamesResilently(games);
  
  console.log('Batch results:');
  results.forEach(result => {
    if (result.data) {
      console.log(`✅ ${result.game}: Success`);
    } else {
      console.log(`❌ ${result.game}: ${result.error}`);
    }
  });
  
  console.log('');
}

// ============================================
// CHALLENGE SECTION: REAL-TIME BETTING SYSTEM (60 minutes)
// Practice Goal: Build a complete async sports betting data pipeline
// ============================================

// TODO 14: MEGA CHALLENGE - Comprehensive Betting Data Manager
class BettingDataManager {
  private fetcher: ResilientSportsDataFetcher;
  private oddsStream: OddsStreamSimulator;
  private cache: Map<string, { data: any; expiry: number }> = new Map();
  private subscribers: Map<string, ((data: any) => void)[]> = new Map();
  
  constructor() {
    this.fetcher = new ResilientSportsDataFetcher();
    this.oddsStream = new OddsStreamSimulator();
    this.setupOddsStream();
  }
  
  private setupOddsStream(): void {
    // Implementation challenge: Set up real-time odds processing
    this.oddsStream.onOddsUpdate(async (liveData) => {
      // Your implementation:
      // 1. Update cache with live data
      // 2. Notify subscribers
      // 3. Handle any errors gracefully
    });
  }
  
  // TODO 15: Smart caching with live updates
  async getGameData(game: string, maxAge: number = 300000): Promise<any> {
    // Implementation challenge:
    // 1. Check cache first
    // 2. If expired or missing, fetch from API
    // 3. Merge with any live updates
    // 4. Cache the result
    
    // Your implementation here:
    
    return null;
  }
  
  // TODO 16: Real-time subscription system
  subscribeToGame(game: string, callback: (data: any) => void): () => void {
    // Implementation challenge:
    // 1. Add callback to subscribers for this game
    // 2. Return unsubscribe function
    // 3. Start live data stream if first subscriber
    
    // Your implementation here:
    
    return () => {}; // Return actual unsubscribe function
  }
  
  // TODO 17: Betting opportunity detector
  async detectValueBets(games: string[], minEdge: number = 0.05): Promise<Array<{
    game: string;
    bet: string;
    edge: number;
    confidence: number;
  }>> {
    // Implementation challenge:
    // 1. Fetch current odds for all games
    // 2. Calculate implied probabilities
    // 3. Compare with your estimated probabilities
    // 4. Return opportunities above minEdge threshold
    
    // Your implementation here:
    
    return [];
  }
  
  async shutdown(): Promise<void> {
    this.oddsStream.stopStream();
    this.cache.clear();
    this.subscribers.clear();
  }
}

// Final test function
async function runBettingSystemDemo(): Promise<void> {
  console.log('🎯 CHALLENGE: Real-Time Betting System Demo\n');
  
  const bettingManager = new BettingDataManager();
  
  try {
    // Test 1: Get game data with caching
    console.log('Testing smart caching...');
    const gameData1 = await bettingManager.getGameData('Lakers vs Warriors');
    const gameData2 = await bettingManager.getGameData('Lakers vs Warriors'); // Should use cache
    
    // Test 2: Real-time subscriptions
    console.log('Testing real-time subscriptions...');
    const unsubscribe = bettingManager.subscribeToGame('Lakers vs Warriors', (data) => {
      console.log('📊 Live update received:', data.moneyline);
    });
    
    // Wait for some live updates
    await delay(5000);
    unsubscribe();
    
    // Test 3: Value bet detection
    console.log('Testing value bet detection...');
    const valueBets = await bettingManager.detectValueBets([
      'Lakers vs Warriors',
      'Celtics vs Heat',
      'Bulls vs Knicks'
    ], 0.03); // 3% minimum edge
    
    console.log('Value betting opportunities:', valueBets);
    
  } finally {
    await bettingManager.shutdown();
  }
  
  console.log('\n✅ Async/Await Practice Complete!');
  console.log('🚀 Ready to build real sports betting APIs with Express.js!');
}

// ============================================
// MAIN EXECUTION - Run all practice sections
// ============================================

async function main(): Promise<void> {
  try {
    await safeApiCall();                    // Section 1: 20 min
    await testConcurrentOperations();       // Section 2: 30 min  
    await testRetryAndRateLimit();         // Section 3: 35 min
    await testStreamingData();             // Section 4: 40 min
    await testErrorRecovery();             // Section 5: 30 min
    await runBettingSystemDemo();          // Challenge: 60 min
    
  } catch (error) {
    console.error('❌ Practice session error:', error);
  }
}

// Uncomment to run all sections:
main();

// Or run individual sections for focused practice:
// safeApiCall();          // Start with this
// testConcurrentOperations(); // Then this
// etc...
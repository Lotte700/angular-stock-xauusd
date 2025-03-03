export interface StockData {
    ticker: string;
    queryCount: number;
    resultsCount: number;
    adjusted: boolean;
    results: StockResult[];
  }
  
  export interface StockResult {
    t: number;  // Timestamp
    c: number;  // Close price
    h: number;  // High price
    l: number;  // Low price
    o: number;  // Open price
    v: number;  // Volume
  }
  
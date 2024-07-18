/// <reference types="vite/client" />

interface TimeSerie {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  timeSeries: TimeSerie[];
}

interface StocksData {
  stocks: Stock[];
}

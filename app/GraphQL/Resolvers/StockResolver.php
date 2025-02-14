<?php

namespace App\GraphQL\Resolvers;

use App\Services\StockService;

class StockResolver
{
    protected $stockService;

    public function __construct(StockService $stockService)
    {
        $this->stockService = $stockService;
    }

    public function resolveStocks($root, array $args)
    {
        $symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'IBM', 'TSLA'];
        $searchQuery = $args['search'] ?? null;
        $interval = $args['interval'];

        $filteredSymbols = $symbols;
        if ($searchQuery) {
            $filteredSymbols = array_filter($symbols, function ($symbol) use ($searchQuery) {
                return stripos($symbol, $searchQuery) !== false;
            });
        }

        $stocks = [];
        foreach ($filteredSymbols as $symbol) {
            $stockData = $this->stockService->getStockData($symbol, $interval);
            if ($stockData) {
                $latestData = reset($stockData);
                $stockName = $this->stockService->getStockName($symbol);

                $timeSeries = [];

                foreach ($stockData as $timestamp => $entry) {
                    $timeSeries[] = [
                        'time' => $timestamp,
                        'open' => (float) $entry['1. open'],
                        'high' => (float) $entry['2. high'],
                        'low' => (float) $entry['3. low'],
                        'close' => (float) $entry['4. close'],
                        'volume' => (int) $entry['5. volume'],
                    ];
                }

                $stocks[] = [
                    'symbol' => $symbol,
                    'name' => $stockName,
                    'price' => (float)$latestData['4. close'],
                    'change' => (float)$latestData['4. close'] - (float)$latestData['1. open'],
                    'timeSeries' => $timeSeries,
                ];
            }
        }

        return $stocks;
    }

    public function resolveStock($root, array $args)
    {
        $symbol = $args['symbol'];
        $interval = $args['interval'];
        $stockData = $this->stockService->getStockData($symbol, $interval);

        if (!$stockData) {
            return null;
        }

        $latestData = reset($stockData);
        $stockName = $this->stockService->getStockName($symbol);
        
        $timeSeries = [];

        foreach ($stockData as $timestamp => $entry) {
            $timeSeries[] = [
                'time' => $timestamp,
                'open' => (float) $entry['1. open'],
                'high' => (float) $entry['2. high'],
                'low' => (float) $entry['3. low'],
                'close' => (float) $entry['4. close'],
                'volume' => (int) $entry['5. volume'],
            ];
        }

        return [
            'symbol' => $symbol,
            'name' => $stockName,
            'price' => (float)$latestData['4. close'],
            'change' => (float)$latestData['4. close'] - (float)$latestData['1. open'],
            'timeSeries' => $timeSeries,
        ];
    }

}

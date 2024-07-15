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

    public function resolveStocks()
    {
        $symbols = ['AAPL', 'GOOGL']; // Add more symbols as needed
        $stocks = [];

        foreach ($symbols as $symbol) {
            $stockData = $this->stockService->getStockData($symbol);
            if ($stockData) {
                $latestData = reset($stockData);
                $stockName = $this->stockService->getStockName($symbol);

                $stocks[] = [
                    'symbol' => $symbol,
                    'name' => $stockName,
                    'price' => (float)$latestData['4. close'],
                    'change' => (float)$latestData['4. close'] - (float)$latestData['1. open'],
                ];
            }
        }

        return $stocks;
    }

    public function resolveStock($root, array $args)
    {
        $symbol = $args['symbol'];
        $stockData = $this->stockService->getStockData($symbol);

        if (!$stockData) {
            return null;
        }

        $latestData = reset($stockData);
        $stockName = $this->stockService->getStockName($symbol);

        return [
            'symbol' => $symbol,
            'name' => $stockName,
            'price' => (float)$latestData['4. close'],
            'change' => (float)$latestData['4. close'] - (float)$latestData['1. open'],
        ];
    }
}

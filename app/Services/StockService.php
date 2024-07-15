<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Cache;

class StockService
{
    protected $client;
    protected $apiKey;

    public function __construct()
    {
        $this->client = new Client();
        $this->apiKey = env('ALPHA_VANTAGE_API_KEY');
    }

    public function getStockData($symbol)
    {
        $cacheKey = 'stock_' . $symbol;
        return Cache::remember($cacheKey, 60, function () use ($symbol) {
            $response = $this->client->get('https://www.alphavantage.co/query', [
                'query' => [
                    'function' => 'TIME_SERIES_INTRADAY',
                    'symbol' => $symbol,
                    'interval' => '1min',
                    'apikey' => $this->apiKey,
                ]
            ]);

            $data = json_decode($response->getBody(), true);
            return $data['Time Series (1min)'] ?? null;
        });
    }

    public function getStockName($symbol)
    {
        $cacheKey = 'stock_name_' . $symbol;
        return Cache::remember($cacheKey, 86400, function () use ($symbol) {
            $response = $this->client->get('https://www.alphavantage.co/query', [
                'query' => [
                    'function' => 'SYMBOL_SEARCH',
                    'keywords' => $symbol,
                    'apikey' => $this->apiKey,
                ]
            ]);

            $data = json_decode($response->getBody(), true);
            if (isset($data['bestMatches'][0]['2. name'])) {
                return $data['bestMatches'][0]['2. name'];
            }
            return null;
        });
    }
}

<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Facades\Redis;

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

        // Attempt to get data from Redis cache
        if ($cachedData = Redis::get($cacheKey)) {
            return json_decode($cachedData, true);
        }

        // If no cached data, fetch from API
        $response = $this->client->get('https://www.alphavantage.co/query', [
            'query' => [
                'function' => 'TIME_SERIES_INTRADAY',
                'symbol' => $symbol,
                'interval' => '1min',
                'apikey' => $this->apiKey,
            ]
        ]);

        $data = json_decode($response->getBody(), true)['Time Series (1min)'] ?? null;

        // Store data in Redis cache for 60 seconds
        if ($data) {
            Redis::setex($cacheKey, 60, json_encode($data));
        }

        return $data;
    }

    public function getStockName($symbol)
    {
        $cacheKey = 'stock_name_' . $symbol;

        // Attempt to get data from Redis cache
        if ($cachedName = Redis::get($cacheKey)) {
            return $cachedName;
        }

        // If no cached data, fetch from API
        $response = $this->client->get('https://www.alphavantage.co/query', [
            'query' => [
                'function' => 'SYMBOL_SEARCH',
                'keywords' => $symbol,
                'apikey' => $this->apiKey,
            ]
        ]);

        $name = json_decode($response->getBody(), true)['bestMatches'][0]['2. name'] ?? null;

        // Store data in Redis cache for 24 hours (86400 seconds)
        if ($name) {
            Redis::setex($cacheKey, 86400, $name);
        }

        return $name;
    }
}

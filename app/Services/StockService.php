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

    public function getStockData($symbol, $interval)
    {
        $supportedIntervals = [
            '1min' => 60,
            '5min' => 300,
            '15min' => 900,
            '30min' => 1800,
            '60min' => 3600,
            'daily' => 86400,  // 24 hours
            'monthly' => 2592000,  // 30 days
        ];
        
        if (!array_key_exists($interval, $supportedIntervals)) {
            throw new InvalidArgumentException("Unsupported interval: $interval");
        }
    
        $cacheKey = 'stock_' . $symbol . '_' . $interval;
        $cacheDuration = $supportedIntervals[$interval];

        // Attempt to get data from Redis cache
        if ($cachedData = Redis::get($cacheKey)) {
            return json_decode($cachedData, true);
        }

        $function = 'TIME_SERIES_INTRADAY';
        $timeSeriesKey = "Time Series ($interval)";
        if ($interval === 'daily') {
            $function = 'TIME_SERIES_DAILY';
            $timeSeriesKey = 'Time Series (Daily)';
        } elseif ($interval === 'monthly') {
            $function = 'TIME_SERIES_MONTHLY';
            $timeSeriesKey = 'Monthly Time Series';
        }

        // If no cached data, fetch from API
        $response = $this->client->get('https://www.alphavantage.co/query', [
            'query' => [
                'function' => $function,
                'symbol' => $symbol,
                'interval' => in_array($interval, ['1min', '5min', '15min', '30min', '60min']) ? $interval : null,
                'apikey' => $this->apiKey,
            ]
        ]);
        
        $data = json_decode($response->getBody(), true)[$timeSeriesKey] ?? null;

        if ($data) {
            Redis::setex($cacheKey, $cacheDuration, json_encode($data));
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

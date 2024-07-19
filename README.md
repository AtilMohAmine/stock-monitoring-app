# Stock Market Monitoring App

## Overview

This project is a full-stack stock market monitoring application that provides real-time stock data, visualizes it using charts, and allows users to monitor multiple stocks. It is built with Laravel 11 for the backend, GraphQL for querying stock data, Redis for caching, and React with Vite for the frontend.

<p align="center">
   <img src="https://github.com/user-attachments/assets/89455a19-d674-48df-8363-49626dd06eb0" style="border-radius: 1%" width="90%">
</p>

## Features

- Real-Time Stock Data: Fetches stock data including price, volume, and other metrics.
- GraphQL API: Provides an efficient and flexible query mechanism for retrieving stock data.
- Caching: Uses Redis to cache API responses for improved performance.
- Chart Visualization: Displays stock data in charts using Recharts.
- Multi-Stock Monitoring: Supports monitoring multiple stocks with customizable intervals.

## Architecture

The architecture of this application is structured as follows:

<p align="center">
   <img src="https://github.com/user-attachments/assets/9f176eae-9719-4d43-a8cf-444c1e12559f" style="border-radius: 1%" width="90%">
</p>

## Getting Started

### Installation

#### Backend (Laravel):

1- Clone the Repository

```sh
 $ git clone https://github.com/AtilMohAmine/stock-monitoring-app.git
 $ cd stock-monitoring-app
```

2- Install PHP Dependencies

```sh
 $ composer install
```

3- Setup Environment File
Copy the .env.example file to .env and update the necessary configuration including the Alpha Vantage API key and Redis settings.

```sh
 $ cp .env.example .env
```

4- Start Laravel Development Server

```sh
 $ php artisan serve
```

#### Frontend (React with Vite):

1- Navigate to the Frontend Directory

```sh
 $ cd frontend
```

2- Install Node Dependencies

```sh
 $ npm install
```

3- Setup Environment Variables

Create a .env file in the frontend directory and add the GraphQL API endpoint.

```env
VITE_REACT_APP_GRAPHQL_ENDPOINT=http://localhost:8000/graphql
```

4- Start Vite Development Server

```sh
 $ npm run dev
```

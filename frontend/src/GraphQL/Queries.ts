import { gql } from "@apollo/client";

export const GET_STOCKS = gql`
    query GetStocks($interval: String!, $search: String) {
        stocks(interval: $interval, search: $search) {
            symbol
            name
            price
            change
            timeSeries {
                time
                open
                high
                low
                close
                volume
            }
        }
    }
`;
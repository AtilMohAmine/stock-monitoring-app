import { gql } from "@apollo/client";

export const GET_STOCKS = gql`
    query GetStocks($interval: String!) {
        stocks(interval: $interval) {
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
import { gql } from "@apollo/client";

export const GET_STOCKS = gql`
    query GetStocks {
        stocks {
            symbol
            name
            price
            change
        }
    }
`;
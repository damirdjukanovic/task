import { gql } from "@apollo/client";

export const LOAD_CATEGORY = gql`
  query load_category($input: CategoryInput!) {
    category(input: $input) {
      name
      products {
        name
        inStock
        id
        gallery
        description
        prices {
          currency
          amount
        }
        attributes {
          name
          type
          items {
            displayValue
            value
          }
        }
      }
    }
  }
`;

export const LOAD_ITEM = gql`
  query load_item($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      prices {
        amount
        currency
      }
      brand
      attributes {
        name
        type
        items {
          displayValue
          value
        }
      }
    }
  }
`;

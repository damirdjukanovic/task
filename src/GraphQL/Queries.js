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

export const LOAD_ALL_PRODUCTS = gql`
query load_category{
  category {
  	products {
      id,
      name,
      category,
      inStock,
      gallery,
      description,
      brand,
      prices{
        currency,
        amount
      },
      attributes{
        id,
        name,
        type,
        items{
          displayValue,
          value,
          id
        }
      }
    }
  }
}
`

export const LOAD_CURRENCIES = gql`
query {
  currencies
}
`
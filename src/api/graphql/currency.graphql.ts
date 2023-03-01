import { gql } from '@apollo/client';

export const GQL_GET_ALL_CURRENCIES = gql`
  query getAllCurrencies {
    getAllCurrencies {
      _id
      address
      code
      currency_index
      country_name
      country_code_alpha_2
      country_code_alpha_3
      price
      create_date_time
      update_date_time
    }
  }
`;

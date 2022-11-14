import { gql } from "@apollo/client";

export const getBooks = gql`
      query {
        books {
          id
          title
          isbn
          pageNumbers
          publisher
        }
      }
    `;
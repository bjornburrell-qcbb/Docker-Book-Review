/* eslint-disable react/prop-types */
import { gql } from "@apollo/client";
import BookView from "../../components/Book/BookView";

import { apolloClient } from "../../lib/apolloClient";



export async function getStaticProps() {
    const { data } = await apolloClient.query({
      query: gql`
        query {
          books {
            id
            title
            isbn
            author
            quantity
          }
        }
      `,
    });
  
    return {
      props: {
        data: data.books,
      },
    };
  }

export const Books = (data) => {
    return(
        <BookView data={data} />
    )
}

export default Books

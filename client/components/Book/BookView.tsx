import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { gql, useQuery } from "@apollo/client";

import { useMemo } from "react";

// import SearchBar from "components/SearchBar";


import BookTable from "./BookTable";
import { getBooks } from "../../graphql";
import { Books } from "../../types/book";
import { apolloClient } from "../../lib/apolloClient";


// export async function getStaticProps() {
//     const { data } = await apolloClient.query({
//       query: gql`
//         query {
//           books {
//             id
//             title
//             isbn
//             publisher
//             pageNumbers
//           }
//         }
//       `,
//     });
  
//     return {
//       props: {
//         data: data.books,
//       },
//     };
//   }

function BookView({data}: any) {
//   const { data: booksData } = useQuery<Books>(getBooks);

const books = data.data;

// const books = useMemo(() => data.books ?? [], [data.books]);

  return (
    <>
      <div className="mb-4 flex justify-between gap-4">
        {/* <div className="flex items-center w-full max-w-[500px] gap-4">
          <SearchBar placeholder="Search by Name or Number" />
          <span className="whitespace-nowrap">
            See all (<b>{orders.length}</b>)
          </span>
        </div> */}
        
      </div>
      <BookTable books={books} />
    </>
  );
}

export default BookView;

import { useRouter } from "next/router";
import { BookCover } from "../components/Book/BookCover";
import { gql, useQuery } from "@apollo/client";
import React, { useContext } from 'react';
import Link from "next/link";

export default function SearchScreen() {
  const { query } = useRouter();
  console.log(query.genre)
  const GET_BOOKBYTITLE = gql`
  query Books($title: String){
    books(where: {title: {startsWith: $title}}) {
      id
      title 
      isbn 
      author
      genre
    }
  }
    `;
  const GET_BOOKBYGENRE = gql`
  query Books($genre: String){
    books(where: {genre: {contains: $genre}}) {
      id
      title 
      isbn 
      author
      genre
    }
  }
    `

    const {loading, error, data} = query.genre ? useQuery(GET_BOOKBYGENRE, { variables: {genre: `${query.genre}`}}) : useQuery(GET_BOOKBYTITLE, { variables: {title: `${query.query}`}});
    const books = data?.books;
    console.log(books);
    console.log(error);
  const filterSearch = ({
    page,
    genre,

    searchQuery,
  
  }) => {
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (genre) query.genre = genre;
    
    console.log(query)

    router.push({
      pathname: router.pathname,
      query: query,
    });
  };


  const categoryHandler = (e) => {
    filterSearch({ category: e.target.value });
  };

  return (
    <div className="grid md:grid-cols-4 md:gap-5 justify-center">

    <div className="md:col-span-3">
      <div className="flex justify-center">
      {/* <div className="flex items-center">
              {books.length === 0 ? 'No' : books.length} Results
              {query !== 'all' && query !== '' && ' : ' + query}
              {(query !== 'all' && query !== '') ? (
                <button onClick={() => router.push('/search')}>
                  X
                </button>
              ) : null}
            </div> */}
        <div className="p-3 grid grid-cols-1 gap-4 md:grid-cols-3">
          {books ? 
          books?.map((book) => (
            <div key={book.id} className='flex justify-center'>
              <Link href={`/books/${book.id}`}>
            <div className="p-3">
              <BookCover key={book.id} title={book.title} author={book.author} isbn={book.isbn} />
            </div>
              </Link>
            </div>
          )) : <div className="flex justify-center"><h1>No Results</h1></div>}
        </div>
        {/* <ul className="flex">
          {books?.length > 0 &&
            [...Array(pages).keys()].map((pageNumber) => (
              <li key={pageNumber}>
                <button
                  className={`default-button m-2 ${
                    page == pageNumber + 1 ? 'font-bold' : ''
                  } `}
                  onClick={() => pageHandler(pageNumber + 1)}
                >
                  {pageNumber + 1}
                </button>
              </li>
            ))}
        </ul> */}
      </div>
    </div>
  </div>
  )
}

// export async function getServerSideProps({query}) {
//   const genre = query.genre || '';
//   const searchQuery = query.query || '';
//   const GET_BOOK = gql`
//   query Books($title: String){
//     books(where: {title: {startsWith: $title}}) {
//       id
//       title 
//       isbn 
//       author
//       genre
//     }
//   }
//     `;
//     const {loading, error, data} = useQuery(GET_BOOK, { variables: {title: `${searchQuery}`}});
//     console.log(books)
//     console.log(genre)
//   const books = data?.books
//   return {
//     props: {
//       books,
//       genre
//     }
//   }
// }
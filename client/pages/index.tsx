import { gql, useQuery } from "@apollo/client";
import { Button, Divider, Input } from "antd";
import type { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BookCover } from "../components/Book/BookCover";
import { BookGenreTags } from "../components/Book/BookGenreTags";
import Dashboard from "../components/Dashboard";
import ISBNInput from "../components/ISBNInput";
import { Navbar } from "../components/Navbar/Navbar";
import { getBooks } from "../graphql";
import { apolloClient } from "../lib/apolloClient";
import { genres } from "../utils/constants";


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

const Home: NextPage = (data) => {
const books = data.data;
  return (
    <div>
      <div className="grow p-3">
        <div className="flex justify-center text-4xl">
        Explore our collection
        </div>
        <div className="flex justify-center text-xl">
        There's a book for everyone
        </div>
      </div>
      <Divider />
      <div className="flex justify-center p-3">
        {genres.map((genre, index) => {
          return (
            <div key={index} className="p-1">
            <BookGenreTags genre={genre}/>
            </div>
          )
        })}
      </div>
      <div className="flex justify-center">
        <div className="rounded-md bg-black-500 p-3 w-11/12">
        <div className="flex justify-center text-xl font-semibold p-3">
          Available Books
        </div>
        <Divider />
        <div className="flex justify-center flex-row">
          {books.map((book) => {
            // eslint-disable-next-line react/jsx-key
            return (
              <div key={book.id} className='flex justify-center'>
              <Link href={`/books/${book.id}`}>
                <div className="p-3">
            <BookCover key={book.id} title={book.title} author={book.author} isbn={book.isbn} />
            {/* {book.title} */}
            </div>
            </Link>
            </div>);
          })}
        </div>
      </div>
      </div>
    </div>
  );
};

export default Home;

import { Button, Input } from "antd";
import type { NextPage } from "next";
import React, { useEffect, useMemo, useState } from "react";
import axios from 'axios';

const ISBNInput: NextPage = () => {
  const [isbnInput, setISBNInput] = useState("");
  const [input, setInput] = useState("");
  const [book, setBook] = useState(null);
const axiosClient = axios.create({
    baseURL: 'https://openlibrary.org/isbn',
})

  const onChange = (e: any) => {
    setInput(e.target.value);
  };

  const onClick = () => {
    setISBNInput(input);
  };

  const getBook = async (isbnInput) => {
    const res = await fetch(
      "https://openlibrary.org/isbn/" + `${isbnInput}` + ".json"
    );
    const answer = await res.json();
    // console.log(answer)
    return answer
  };

//   const bookInfo = useMemo(() => getBook(isbnInput), [isbnInput])
//   console.log(bookInfo);
  
useEffect(() => {
    axiosClient.get('/' + `${isbnInput}.json`).then((response) => {
        setBook(response.data);
    })
})

  return (
    <div className="flex flex-col p-8 gap-2">
      <div className="font-semibold">Enter ISBN Number:</div>
      <div className="flex flex-row">
        <Input.Group compact>
          <Input onChange={onChange} style={{ width: "calc(100% - 200px)" }} />
          <Button onClick={onClick} type="primary">
            Submit
          </Button>
        </Input.Group>
      </div>
      <div className="flex flex-row">
      <img
          src={
            "https://covers.openlibrary.org/b/isbn/" + `${isbnInput}` + "-L.jpg"
          }
        />
      </div>
      <div>
        <p>Title: {book?.title}</p>
      </div>
    </div>
    
  );
};

export default ISBNInput;

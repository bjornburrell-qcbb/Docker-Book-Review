import { Card } from "antd"
import Meta from "antd/lib/card/Meta"
import React from "react"

// eslint-disable-next-line react/prop-types
export const BookCover = ({title, author, isbn}) => {
    return (
    // <Card hoverable className="p-3 w-97 max-h-96">

    //             <div className="py-3 w-97">
    //         <img
    //       src={
    //         "https://covers.openlibrary.org/b/isbn/" + `${isbn}` + "-L.jpg"
    //       }
    //     />
    //     </div>

    //         <div>{title}</div>
    //         <div>{author}</div>
    //       </Card>
    <Card
    hoverable
    style={{ width: 300 }}
    cover={
      <img
        alt="example"
        src={
                  "https://covers.openlibrary.org/b/isbn/" + `${isbn}` + "-L.jpg"
                }
        style={{ maxHeight: 350 }}
      />
    }
  >
    <Meta
      title={title}
      description={author}
    />
  </Card>
    )
}
/* eslint-disable react/prop-types */
import { Button } from "antd";
import router from "next/router";


export const BookGenreTags = ({genre}) => {
    return (
        
    <Button type="primary" shape="round" onClick={() => router.push(`/search?genre=${genre}`)}>
        {genre}
    </Button>
)
}

/* eslint-disable react/prop-types */
import { Button } from "antd";


export const BookGenreTags = ({genre}) => {
    return (
        
    <Button type="primary" shape="round" onClick={() => console.log(genre)}>
        {genre}
    </Button>
)
}

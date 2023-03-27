import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { Button, Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import { NextPage } from 'next';
import Router, { useRouter } from 'next/router';
import { title } from 'process';
import React, { useContext } from 'react';
import { apolloClient } from '../../lib/apolloClient';
import { Store } from '../../utils/Store';


const BookScreen: NextPage = () => {
    const { state, dispatch } = useContext(Store);

    const { query } = useRouter();
    const { id } = query;
    const GET_BOOK = gql`
    query Book($id: ID!) {
        book(where:{id: $id}) {
            id
            title
            isbn
            author
            genre
            quantity
        }
    }
    `;
    const {loading, error, data} = useQuery(GET_BOOK, { variables: {id: `${id}`}});
    
    const book = data?.book;

    const addToCartHandler = () => {
        const existItem = state.cart.cartItems.find((x) => x.id === data?.book.id);
        const cartQuantity = existItem ? existItem.cartQuantity + 1 : 1;

        console.log(existItem)
        console.log('Stock Quantity: ' + data?.book.quantity)
        console.log('Existing Item Quantity: ' + cartQuantity)
    
        if (data?.book.quantity < cartQuantity) {
          alert('Sorry. Product is out of stock');
          return;
        }
    
        dispatch({ type: 'CART_ADD_ITEM', payload: { ...data?.book, cartQuantity } });
        Router.push('/cart')
      };

    return (
      <div className='flex justify-center'>
        <Card
    cover={
      <img
        alt="example"
        src={
                  "https://covers.openlibrary.org/b/isbn/" + `${book?.isbn}` + "-L.jpg"
                }
        style={{ display: 'flex', maxHeight: 350, padding: 3 }}
      />
    }
  >
    <h2>Title:</h2>  <p>{book?.title}</p>
    <h2>Author: </h2> <p>{book?.author}</p>
    <h2>Stock Quantity: </h2> <p>{book?.quantity}</p>
    <h2>ISBN: </h2> <p>{book?.isbn}</p>

            <Button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Add to cart
            </Button>
  </Card>
</div>

        
    )
}

export default BookScreen
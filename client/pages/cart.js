import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import {CloseCircleOutlined} from '@ant-design/icons'
import { ToastContainer, toast } from 'react-toastify'
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import { Button } from 'antd';
import dynamic from 'next/dynamic'
import { gql, useMutation} from "@apollo/client";
import { useAuth } from '../lib/auth';
import Cookies from 'js-cookie'

function CartScreen() {
  const router = useRouter();
  const data  = router.query;
  console.log(data)
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = (item, qty) => {
    const quantity = Number(qty);
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity } });
  };

  const {isSignedIn} = useAuth();

  const UPDATE_BOOK = gql`
  mutation ($id: ID!, $quantity: Int) {
    updateBooks(data: {
      where:{id: $id},
      data: {
        quantity: $quantity
      }
    }) {
      id
      title
      quantity
      
    }
  }
  `
  const [mutateFunction, { loading, error}] = useMutation(UPDATE_BOOK)

  const checkoutNotify = () => toast(`${cartItems.reduce((a, c) => a + c.cartQuantity, 0)} Books Checked Out`)

  const checkout = () => {

    isSignedIn ?

    cartItems.map((cartItem) => {
      const quantityDif = cartItem.quantity - cartItem.cartQuantity

      quantityDif < 0 ? toast(`${cartItem.name} Quantity needs to be less than ${cartItem.cartQuantity}`) : mutateFunction({ variables: {id: `${cartItem.id}`, quantity: quantityDif}});

      dispatch({ type: 'CART_CLEAR_ITEMS' });

      toast('Checkout Complete')
    })

    :

    router.push('/login')
  }
  return (
    <div className='p-3'>
      <h1 className="mb-4 text-xl">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b">
                <tr>
                  <th className="p-5 text-left">Item</th>
                  <th className="p-5 text-right">Quantity</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td>
                      <Link href={`/book/${item.id}`}>
                        <a className="flex items-center p-3">
                        <img
        alt="example"
        src={
                  "https://covers.openlibrary.org/b/isbn/" + `${item.isbn}` + "-L.jpg"
                }
        style={{ width: 50, height: 50 }}
      />
                          &nbsp;
                          {item.title}
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right">{item.cartQuantity}</td>
                    <td className="p-5 text-right">{item.cartQuantity} {"Credit(s)"}</td>
                    <td className="p-5 text-center">
                      <Button type='primary' onClick={() => removeItemHandler(item)}>
                      {/* <CloseCircleOutlined className="h-5 w-5"/> */} X
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl">
                  Subtotal ({cartItems.reduce((a, c) => a + c.cartQuantity, 0)}) : {cartItems.reduce((a, c) => a + c.cartQuantity, 0)} Credit
                </div>
              </li>
              <li>
                <Button
                  onClick={checkout}
                  className="primary-button w-full"
                >
                  Check Out
                </Button>
                <ToastContainer position='top-center' theme='colored' />
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}


export default dynamic(() => Promise.resolve(CartScreen), { ssr: false });
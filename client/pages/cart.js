import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import {CloseCircleOutlined} from '@ant-design/icons'
import { ToastContainer, toast } from 'react-toastify'
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import { Button, Select } from 'antd';
import dynamic from 'next/dynamic'
import { gql, useMutation, useQuery} from "@apollo/client";
import { useAuth } from '../lib/auth';
import Cookies from 'js-cookie'

function CartScreen() {
  const router = useRouter();
  // const data  = router.query;
  // console.log(data)
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  const updateCartHandler = (item, qty) => {
    const updatedQuantity = Number(qty);
    console.log(item)
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...item, updatedQuantity } });
    console.log(cartItems)
  };

  const {isSignedIn, data} = useAuth();

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

  const GET_USER = gql`
    query ($id: ID!) {
        user(where:{id: $id}) {
            id
            credits
        }
    }
    `;
    const result = isSignedIn ? useQuery(GET_USER, { variables: {id: `${data.user.id}`}}) : undefined;

    const credits = isSignedIn ? result?.data?.user?.credits : undefined

    const cartCredit = cartItems.reduce((a, c) => a + c.updatedQuantity, 0)


  const UPDATE_USER = gql`
  mutation ($id: ID!, $credits: Int) {
    updateUsers(data: {
      where:{id: $id},
      data: {
        credits: $credits
      }
    }) {
      id
      credits
      
    }
  }
  `
  const [mutateFunction, { loading, error}] = useMutation(UPDATE_BOOK)
  const [updateUser] = useMutation(UPDATE_USER)

  const checkoutNotify = () => toast(`${cartItems.reduce((a, c) => a + c.updatedQuantity, 0)} Books Checked Out`)

  const checkout = () => {

    isSignedIn ?

    cartItems.map((cartItem) => {
      const quantityDif = cartItem.quantity - cartItem.updatedQuantity

      quantityDif < 0 ? toast.error(`${cartItem.name} Quantity needs to be less than ${cartItem.updatedQuantity}`, {position: "top-center"}) : mutateFunction({ variables: {id: `${cartItem.id}`, quantity: quantityDif}});

      dispatch({ type: 'CART_CLEAR_ITEMS' });

    }) +
    console.log(credits) + (credits - cartCredit) < 0 ? toast.error('Not Enough Credits', {position: "top-center"}) : updateUser({ variables: {id: `${data.user.id}`, credits: (credits - cartCredit)}}) + toast.success('Checkout Complete', {position: "top-center"})

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
                    {/* <td className="p-5 text-right">{item.cartQuantity}</td> */}
                    <td className="p-5 text-right">
                      {/* <select
                        value={item.updatedQuantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.quantity).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select> */}
                      <Select 
                        defaultValue={item.updatedQuantity}
                        onChange={(value) => updateCartHandler(item, value)}
                      >
                        {[...Array(item.quantity).keys()].map((x) => (
                          // eslint-disable-next-line react/jsx-no-undef
                          <Option key={x + 1} value={x + 1}>
                            {x + 1}
                          </Option>
                        ))}
                      </Select>
                    </td>
                    <td className="p-5 text-right">{item.updatedQuantity} {"Credit(s)"}</td>
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
                  Subtotal ({cartItems.reduce((a, c) => a + c.updatedQuantity, 0)}) : {cartItems.reduce((a, c) => a + c.updatedQuantity, 0)} Credit
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
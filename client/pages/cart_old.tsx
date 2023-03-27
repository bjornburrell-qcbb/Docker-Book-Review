import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import {CloseCircleOutlined} from '@ant-design/icons'

import { Store } from '../utils/Store';
import { useRouter } from 'next/router';
import { Button } from 'antd';

export default function CartScreen() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const removeItemHandler = (item) => {
    console.log('passed')
    dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  };
  return (
    <div>
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
                  <tr key={item.slug} className="border-b">
                    <td>
                      <Link href={`/book/${item.id}`}>
                        <a className="flex items-center">
                          <Image
                            src={item.image}
                            alt={item.title}  
                            width={50}
                            height={50}
                          ></Image>
                          &nbsp;
                          {item.title}
                        </a>
                      </Link>
                    </td>
                    <td className="p-5 text-right">{item.quantity}</td>
                    <td className="p-5 text-right">${item.title}</td>
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
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <Button
                  onClick={() => router.push('/shipping')}
                  className="primary-button w-full"
                >
                  Check Out
                </Button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
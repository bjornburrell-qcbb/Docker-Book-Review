import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { SearchOutlined } from '@ant-design/icons';
import 'react-toastify/dist/ReactToastify.css';
import { Store } from '../../utils/Store';

export const Navbar = () => {
  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.cartQuantity, 0));
  }, [cart.cartItems]);

  const [query, setQuery] = useState('');

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };
  return (
    <>
      <nav className='flex items-center flex-wrap bg-green-300 p-5'>
        <Link href='/'>
          <a className='inline-flex items-center p-2 mr-4 '>
          <img src="https://cdn.shopify.com/s/files/1/0598/5524/1423/t/7/assets/queen-city-book-bank-with-piglet-1656429644763_1200x.png?v=1656429642"
    style={{ width: 256 }}
    />
          </a>
        </Link>
        <div className='flex justify-between w-full '>
          <div className='flex'>
            <Link href='/'>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-blue font-bold items-center justify-center hover:bg-green-600 hover:text-black '>
                Home
              </a>
            </Link>
            <Link href='/books'>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-blue font-bold items-center justify-center hover:bg-green-600 hover:text-black'>
                Collection
              </a>
            </Link>
            <Link href='/'>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-blue font-bold items-center justify-center hover:bg-green-600 hover:text-black'>
                About us
              </a>
            </Link>
            <Link href='/'>
              <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-blue font-bold items-center justify-center hover:bg-green-600 hover:text-black'>
                Contact us
              </a>
            </Link>
            
          </div>
          <div className='flex w-60'>
          <form
              onSubmit={submitHandler}
              className="mx-auto  hidden w-full justify-center md:flex"
            >
              <input
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                placeholder="Search books"
              />
              <button
                className="rounded rounded-tl-none rounded-bl-none bg-amber-300 p-1 text-sm dark:text-black"
                type="submit"
                id="button-addon2"
              >
                <SearchOutlined className="h-5 w-5"></SearchOutlined>
              </button>
            </form> 
            </div>
            <div className='flex'>
          <Link href='/cart'>
          <a className='lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-blue font-bold items-center justify-center hover:bg-green-600 hover:text-black'>
            Cart
            {/* {cart.cartItems.length > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {cart.cartItems.reduce((a, c) => a + c.cartQuantity, 0)}
                    </span>
                  )} */}
                   {cartItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white"> {cartItemsCount}
                    </span>
                  )}
            </a>
            </Link>
            <Link href="/login">
                <a className="p-2">Login</a>
              </Link>
          </div>
        </div>
      </nav>
    </>
  );
};
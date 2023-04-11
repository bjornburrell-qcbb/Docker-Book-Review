import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react'
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Store } from '../utils/Store';
import { toast } from 'react-toastify';
import { getError } from '../utils/error';
import { useAuth } from '../lib/auth';
import { Button } from 'antd';


export default function LoginScreen() {
  // const [user, setUser] = useState();
  const [specialID, setSpecialID] = useState();
  const router = useRouter()
  const { dispatch } = useContext(Store);
  const [id, setID] = useState('')
  // const [error, setError] = useState(false);
  const { signIn, signOut, data, error } = useAuth()
  const {
    handleSubmit,
    register
  } = useForm();
  const GET_USER = gql`
    query User($id: ID!) {
        user(where:{id: $id}) {
            id
            name
            email
            shippingAddress
            aptRoomNum
            city
            state
            zipcode
            credits
        }
    }
    `;
  const submitHandler = ({ id }) => {
    signIn({ id })
    // data == null ? setError(true) : router.back()
    if(data) {
      toast.success("Logged In Successfully", {position: "top-center"})
      router.back()
    } 
  };
  // const {loading, error, data} = useQuery(GET_USER, { variables: {id: `${specialID}`}});
  // console.log(data?.user)
  // const user = data?.user;
  // data?.user ? router.push({pathname: '/cart', query: { user: user}}) : undefined;
  // console.log(data)
  
  return (
    <div className='p-3'>
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4 py-3">
          <label>Special ID</label>
          <input
            className="peer h-10 w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            id="id"
            autoFocus
            {...register('id')}
          ></input>
          {error ? <div className="text-red-500 ">Please enter the correct special ID.</div> : (
            <div>{}</div>
          ) }
        </div>
        <div className="mb-4 ">
          <Button type={'primary'} htmlType='submit' className="primary-button border-1 rounded-sm">Login</Button>
        </div>
        <div className="mb-4 ">
          Don&apos;t have an account? &nbsp;
          Contact Queen City Book Bank
        </div>
      </form>
    </div>
  );
}
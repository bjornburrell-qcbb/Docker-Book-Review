import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Store } from '../utils/Store';


export default function LoginScreen() {
  // const [user, setUser] = useState();
  const [specialID, setSpecialID] = useState();
  const router = useRouter()
  const { dispatch } = useContext(Store);
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
  const submitHandler = ({ specialID }) => {
    console.log(specialID);
    setSpecialID(specialID);
  };
  const {loading, error, data} = useQuery(GET_USER, { variables: {id: `${specialID}`}});
  console.log(data?.user)
  const user = data?.user;
  // data?.user ? router.push({pathname: '/cart', query: { user: user}}) : undefined;

  
  return (
    <div className='p-3'>
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Login</h1>
        <div className="mb-4">
          <label>Special ID</label>
          <input
            className="w-full"
            id="specialID"
            autoFocus
            {...register('specialID')}
          ></input>
          {data ? (
            <div></div>
          ) : <div className="text-red-500 ">Please enter the correct special ID.</div>}
        </div>
        <div className="mb-4 ">
          <button className="primary-button">Login</button>
        </div>
        <div className="mb-4 ">
          Don&apos;t have an account? &nbsp;
          Contact Queen City Book Bank
        </div>
      </form>
    </div>
  );
}
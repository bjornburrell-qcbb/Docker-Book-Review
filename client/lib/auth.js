/* eslint-disable react/prop-types */
import React, { useState, useContext, createContext } from 'react'
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from '@apollo/client'
import { toast } from 'react-toastify'

const authContext = createContext()

export function AuthProvider({ children }) {
  const auth = useProvideAuth()

  return (
    <authContext.Provider value={auth}>
        <ApolloProvider client={auth.createApolloClient()}>
        {children}
      </ApolloProvider>
    </authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}

function useProvideAuth() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState();


  const createApolloClient = () => {

    return new ApolloClient({
      uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
    })
  }

  const signIn = async ({ id }) => {
    const client = createApolloClient()
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
    `

    const result = await client.query({
      query: GET_USER,
      variables: { id },
    })


    console.log(result)
  result.data.user ? setData(result.data) + setError(false) + toast.success("Logged In Successfully", { position: "top-center" }) : setError(true);
    

    if(result.data) {
      setIsSignedIn(true)
    }


  }

  const signOut = () => {
    setIsSignedIn(false)
    setData(null)
  }

  return {
    isSignedIn,
    signIn,
    signOut,
    data,
    createApolloClient,
    error
  }
}
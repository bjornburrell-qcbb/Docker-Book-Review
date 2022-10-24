import '../styles/globals.css'
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp


import { Button, Input } from 'antd'
import type { NextPage } from 'next'
import React, { useState } from 'react'


const Home: NextPage = () => {
  const [isbnInput, setISBNInput] = useState('');

  return (
   <div className='flex flex-col border-2'>
    <div className='font-semibold'>
      Enter ISBN Number:
    </div>
    <div className='flex flex-row'>
      <Input.Group compact>
      <Input style={{ width: 'calc(100% - 200px)' }}  />
      <Button type="primary">Submit</Button>
    </Input.Group>
    </div>
   </div>
  )
}

export default Home

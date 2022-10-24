
import { Button, Input } from 'antd'
import type { NextPage } from 'next'


const Home: NextPage = () => {
  return (
   <div className='flex'>
      <Input.Group compact>
      <Input style={{ width: 'calc(100% - 200px)' }}  />
      <Button type="primary">Submit</Button>
    </Input.Group>
   </div>
  )
}

export default Home

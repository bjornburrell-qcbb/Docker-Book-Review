import { Card, Space, Button, Input, Typography, Breadcrumb, Layout, Menu,Image } from 'antd';
import type { NextPage } from 'next'
import React, { useState } from 'react'

const { Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const Home: NextPage = () => {
  const [isbnInput, setISBNInput] = useState('');
  const [editableStr, setEditableStr] = useState('TITLE');
  const [editableStr2, setEditableStr2] = useState('DESCRIPTION');
  const [editableStr3, setEditableStr3] = useState('MEDIA');
  const [editableStr4, setEditableStr4] = useState('INVENTORY');
  const [editableStr5, setEditableStr5] = useState('LANGUAGE');
  const [editableStr6, setEditableStr6] = useState('PUBLISHER');
  const [editableStr7, setEditableStr7] = useState('NUMBER OF PAGES');
  const [editableStr8, setEditableStr8] = useState('PUBLICATION DATE');

  return (
  <Layout className="layout">
    <Header> 
    <Space>   
    <div className="logo">
      <Image
        width={30}
        src="https://cdn.shopify.com/s/files/1/0598/5524/1423/t/7/assets/qcbb_mascot_vector_d-1654188986651.png?v=1654188986"
        />
    </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
        items={new Array(3).fill(null).map((_, index) => {
          const key = index + 1;
          return {
            key,
            label: `Page ${key}`,
          };
        })}
      />
    </Space>
    </Header>
    <Content style={{ padding: '0 50px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
      <div className="site-layout-content"><div className='flex flex-col border-2'>





<div className='flex flex-col border-2'>
<Space direction="vertical" size="middle" style={{ display: 'flex' }}>
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
  <Card title="Title" size="small">
    <Paragraph
        editable={{
          onChange: setEditableStr,
        }}
      >
        {editableStr}
      </Paragraph>
    </Card>
    <Card title="Description" size="small">
      <Paragraph
        editable={{
          onChange: setEditableStr2,
        }}
      >
        {editableStr2}
      </Paragraph>
    </Card>
    <Card title="Media" size="small">
      <Paragraph
        editable={{
          onChange: setEditableStr3,
        }}
      >
        {editableStr3}
      </Paragraph>
    </Card>
    <Card title="Inventory" size="small">
      <Paragraph
        editable={{
          onChange: setEditableStr4,
        }}
      >
        {editableStr4}
      </Paragraph>
    </Card>
    <Card title="Language" size="small">
      <Paragraph
        editable={{
          onChange: setEditableStr5,
        }}
      >
        {editableStr5}
      </Paragraph>
    </Card>
    <Card title="Publisher" size="small">
      <Paragraph
        editable={{
          onChange: setEditableStr6,
        }}
      >
        {editableStr6}
      </Paragraph>
    </Card>
    <Card title="Number of Pages" size="small">
      <Paragraph
        editable={{
          onChange: setEditableStr7,
        }}
      >
        {editableStr7}
      </Paragraph>
    </Card>
    <Card title="Publication Date" size="small">
      <Paragraph
        editable={{
          onChange: setEditableStr8,
        }}
      >
        {editableStr8}
      </Paragraph>
    </Card>
    </Space>
  </div>
</div></div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Queen City Book Bank ©2022 Created by Queen City Book Bank</Footer>
  </Layout>

  )
}

export default Home;


import React from 'react'
import { Link } from 'wouter'
import { Layout, Menu } from 'antd'
import { resourcesName } from '../../pages'

export const Navbar = () => (
   <Layout.Header>
      <Menu theme="dark" mode="horizontal">
         {resourcesName.map(pathRes => (
            <Menu.Item key={pathRes}>
               <Link href={`/${pathRes}`}>{pathRes.toUpperCase()}</Link>
            </Menu.Item>
         ))}
      </Menu>
   </Layout.Header>
)

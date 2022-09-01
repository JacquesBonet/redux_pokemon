import React from 'react'
import ReactDOM from 'react-dom'
import { factoryCreateStore } from './crud/stores'
import { Provider } from 'react-redux'
import { Layout } from 'antd'
import './css/app.css'
import { Routes } from './routes'
import { resourcesName } from './pages'
import { Navbar } from './components/navbar'
import { MessageBox } from './components/message'

ReactDOM.render(
   <Provider store={factoryCreateStore(resourcesName)}>
      <Layout className="layout">
         <Navbar />
         <Layout.Content style={{ padding: '50px', height: '100vh' }}>
            <Routes />
         </Layout.Content>
         <MessageBox />
      </Layout>
   </Provider>,
   document.getElementById('root')
)

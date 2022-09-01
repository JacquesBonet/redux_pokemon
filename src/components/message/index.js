import React from 'react'
import { useSelector } from 'react-redux'
import { message } from 'antd'

export const MessageBox = () => {
   const payload = useSelector(state => state.errors)

   return payload.status > 400 ? message.error('Error ' + payload.status) : null
}

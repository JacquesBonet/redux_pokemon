import React from 'react'
import PropTypes from 'prop-types'
import { Button, Drawer, Form, Input } from 'antd'
import * as TYPES from '../../crud/constants/docs'

export const DocDetails = ({ create = f => f, update = f => f, doc, schema, path, isLoading, type }) => {
   const handleAddOrUpdate = newDoc => {
      doc && doc.id ? update(path, { ...doc, ...newDoc }) : create(path, newDoc)
   }
   const initialValues = Object.entries(schema(doc)).reduce(
      (acc, [label, { field, value }]) => ({ ...acc, [field]: value }),
      {}
   )

   if (type === TYPES.CREATE_SUCCESS || type === TYPES.UPDATE_SUCCESS) return window.history.back()

   if (!doc) return null

   return (
      <Drawer
         title={`Pokemon ${schema(doc).title.value}`}
         width={720}
         onClose={() => window.history.back()}
         visible={true}
      >
         <Form
            initialValues={initialValues}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            onSubmit={event => event.preventDefault()}
            onFinish={handleAddOrUpdate}
            style={{ marginTop: '200px' }}
         >
            {Object.entries(schema(doc)).map(([label, { field, value, widget = Input, required }], idx) => (
               <Form.Item
                  key={label}
                  label={label}
                  name={field}
                  rules={[{ required, message: `Please input ${field}!` }]}
               >
                  {React.createElement(widget)}
               </Form.Item>
            ))}
            <Form.Item key="submit" wrapperCol={{ offset: 16, span: 8 }}>
               <Button type="primary" htmlType="submit" disabled={isLoading}>
                  {doc && doc.id ? 'UPDATE' : 'ADD'}
               </Button>
            </Form.Item>
         </Form>
      </Drawer>
   )
}

DocDetails.propTypes = {
   doc: PropTypes.object,
   schema: PropTypes.func,
   path: PropTypes.string,
}

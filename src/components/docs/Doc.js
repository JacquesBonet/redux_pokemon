import React from 'react'
import { Link } from 'wouter'
import PropTypes from 'prop-types'
import { Card } from 'antd'

export const Doc = ({ doc, schema, path }) => (
   <Link href={`/${doc.name}`}>
      <Card
         key={path}
         hoverable
         style={{ borderRadius: 5, backgroundColor: '#eee', padding: 2, cursor: 'pointer' }}
         cover={
            <img
               alt="Loading..."
               src={schema(doc).img.value}
               style={{ height: 300, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
            />
         }
      >
         <Card.Meta
            title={schema(doc).title.value}
            description={`Height: ${schema(doc).height.value}, Weight: ${schema(doc).weight.value}`}
         />
      </Card>
   </Link>
)

Doc.propTypes = {
   doc: PropTypes.object.isRequired,
}

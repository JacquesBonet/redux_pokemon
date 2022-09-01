import React from 'react'
import PropTypes from 'prop-types'
import { Doc } from './Doc'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import { Col, Row } from 'antd'
import { responsiveColProps } from '../../crud/utils/responsive'

export const Docs = ({ docs, loading, read, schema, next, path }) => {
   const [sentryRef] = useInfiniteScroll({
      loading,
      hasNextPage: next,
      onLoadMore: () => read(next),
      rootMargin: '0px 0px 500px 0px',
   })

   if (!docs) return null

   return (
      <div>
         <div style={{ margin: 10 }}>
            <Row gutter={[16, 16]}>
               {docs.map((doc, idx) => (
                  <Col {...responsiveColProps} key={idx}>
                     <Doc doc={doc} idx={idx} schema={schema} path={path} />
                  </Col>
               ))}
            </Row>
            {(loading || next) && (
               <Row ref={sentryRef}>
                  <p>Loading ...</p>
               </Row>
            )}
         </div>
      </div>
   )
}

Docs.propTypes = {
   create: PropTypes.func.isRequired,
   del: PropTypes.func.isRequired,
   docs: PropTypes.arrayOf(PropTypes.object).isRequired,
   path: PropTypes.string,
   schema: PropTypes.func.isRequired,
   update: PropTypes.func.isRequired,
}

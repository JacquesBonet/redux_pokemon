import React from 'react'
import { resourcesName } from './pages'
import dynamic from 'next/dynamic'
import { Route, Router } from 'wouter'

function PageCaller({ path }) {
   const Page = React.useMemo(() => dynamic(() => import(`./pages/${path}/docs`), { ssr: false }), [path])
   return <Page path={path} />
}

function PageDetailsCaller({ path, id }) {
   const PageDetails = React.useMemo(() => dynamic(() => import(`./pages/${path}/details`), { ssr: false }), [path, id])
   return <PageDetails path={path} id={id} />
}

export const Routes = () => (
   <>
      {resourcesName.map(path => (
         <Router base={`/${path}`} key={path}>
            <PageCaller path={path} />
            <Route path={`/:id`}>{({ id }) => <PageDetailsCaller path={path} id={id} />}</Route>
         </Router>
      ))}
   </>
)

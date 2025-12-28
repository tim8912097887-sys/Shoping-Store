import { Outlet } from 'react-router'
import UserAuthProvider from './contexts/UserAuthProvider'
import TitleBar from './components/TitleBar'
import { Suspense } from 'react'
import { PageLoader } from './components/PageLoader'

function App() {

  return (
    <>
      <UserAuthProvider>
        <TitleBar />
        <Suspense fallback={<PageLoader/>}>
          <Outlet/>
        </Suspense> 
      </UserAuthProvider>     
    </>
  )
}

export default App

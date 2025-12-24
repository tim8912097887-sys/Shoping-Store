import { Outlet } from 'react-router'
import UserAuthProvider from './contexts/UserAuthProvider'
import TitleBar from './components/TitleBar'

function App() {

  return (
    <>
      <UserAuthProvider>
        <TitleBar />
         <Outlet/> 
      </UserAuthProvider>     
    </>
  )
}

export default App

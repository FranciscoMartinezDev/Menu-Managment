import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { MenuProvider } from './Context/MenuContext'
import './App.css'
import MenuManagment from './assets/MenuManagment'
import MenuInfo from './assets/MenuInfo'
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react'
import Menu from './assets/Menu'

const { ToastContainer } = createStandaloneToast();


const routes = createBrowserRouter([
  {
    path: '/',
    element: <MenuManagment />
  },
  {
    path: '/Add',
    element: <MenuInfo />
  },
  {
    path: '/Menu',
    element: <Menu />
  },
])

function App() {
  return (
    <ChakraProvider toastOptions={{ defaultOptions: { position: 'top' } }}>
      <MenuProvider>
        <ToastContainer />
        <RouterProvider router={routes} />
      </MenuProvider>
    </ChakraProvider>
  )
}

export default App

import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './Components/Home'
import AdminHome from './Components/AdminHome'
import AdminLogin from './Components/AdminLogin'
import AddMenu from './Components/AddMenu'
import UpdateMenu from './Components/UpdateMenu'
import ViewOrder from './Components/ViewOrder'
import Dashboard from './Components/Dashboard'
import MenuItem from './Components/MenuItem'
import CartPage from './Components/CartPage'

function App() {
  
  return (
    <>
     <BrowserRouter>
     <Routes>
        {/* <Route path = "/" element={<Home/>}/> */}

        <Route path = "/admin" element={<AdminHome/>}>
          <Route path='login' element={<AdminLogin/>}/>
          <Route path='addmenu' element={<AddMenu/>}/>
          <Route path='updatemenu' element={<UpdateMenu/>}/>
          <Route path='vieworders' element={<ViewOrder/>}/>
          <Route path='dashboard' element={<Dashboard/>}/>
        </Route>
        <Route path='select_menu' element={<MenuItem/>}/>
        <Route path='cartpage' element={<CartPage/>}/>

     </Routes>
     
     </BrowserRouter>  
    </>
  )
}

export default App

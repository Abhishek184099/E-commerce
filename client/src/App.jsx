import React from 'react'
import Home from './pages/Home'
import { Routes,Route } from 'react-router-dom'
import Login from './pages/Login'
import SignUp from './pages/Signup'
import { Toaster } from "react-hot-toast";
import { useAuthContext } from './context/AuthContext'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AllProduct from "./pages/AllProduct"
import NotLoggedIn from './pages/Error'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

export default function App() {

  const {authUser} = useAuthContext()
  return (    
    <div>
      <Routes>  
        <Route path ='/home' element = {<Home/>}/>
        <Route path ='/login' element = {<Login/>}/>        
        <Route path ='/signup' element = {<SignUp/>}/>  
        <Route path ='/adminpanel/*' element = { authUser?.role === "ADMIN" ? <AdminDashboard/> :<NotLoggedIn/> }  />  
        <Route path ='/getproduct' element = { authUser?.role ==="GENERAL" ? <AllProduct/> : <Login/>}/>  
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />

        
        
       
      </Routes>
      <Toaster/>
    </div>

  )
  
 
}

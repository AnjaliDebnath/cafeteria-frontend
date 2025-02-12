import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Counter from "./pages/Counter"
import Cart from "./pages/Cart";
import Merchant from "./pages/Merchant";
import Dishes from "./pages/Dishes";
import Navbar from './components/Navbar';


import './App.css'
import CounterDishes from './pages/CounterDishes';
import Register from './pages/Register';
import LoginPage from './pages/LoginPage';
import AdminProfile from './pages/AdminProfile';

function App() {
  

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element= {<Home/>}/>
        <Route path='/admin' element= {<AdminProfile/>}/>
        <Route path='/counter' element= {<Counter/>}/>
        <Route path='/counterDishes' element= {<CounterDishes/>}/>
        <Route path='/cart' element= {<Cart/>}/>
        <Route path='/allDishes' element= {<Dishes/>}/>
        <Route path='/merchant' element= {<Merchant/>}/>
      
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        </Routes>
    </Router>
  )
}

export default App

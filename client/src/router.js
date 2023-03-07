import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './pages/landing'
import Login from './pages/login'
import Register from './pages/register'
import Profile from './pages/profile'
import Catalog from './pages/catalog'
import Product from './pages/product'
import Checkout from './pages/checkout'
import Navbar from './components/navbar'
import Notification from './pages/notification'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Landing />} className='landing'/>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile/:userID" element={<Profile />} />
        <Route exact path="/catalog/:userID" element={<Catalog />} />
        <Route exact path="/products/:productID" element={<Product />} />
        <Route exact path="/checkout/:productID" element={<Checkout />} />
        <Route exact path="/notifications" element={<Notification />} />
      </Routes>
    </Router>
  )
};

export default App;
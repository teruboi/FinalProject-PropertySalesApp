import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
import Profile from "./pages/profile";
import Catalog from "./pages/catalog";
import Product from "./pages/product";
import Checkout from "./pages/checkout";
import Notification from "./pages/notification";
import Testing from "./pages/testing";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/?landing" element={<Landing />}/>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/catalog" element={<Catalog />} />
        <Route path="/products/:id" element={<Product />} />
        <Route exact path="/checkout" element={<Checkout />} />
        <Route exact path="/notifications" element={<Notification />} />
        <Route exact path="/testing/:id" element={<Testing />} />
      </Routes>
    </Router>
  );
}

export default App;

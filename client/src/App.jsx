// Importing npm modules
import React, { useState, useEffect } from "react";

// Importing local components
import SideBar from './components/sidebar'
import Router from './router'

export default function App() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (window.location.href === "http://localhost:5173/" ||
    window.location.href === "http://localhost:5173/login" ||
    window.location.href === "http://localhost:5173/register") {
      setShow(false)
    } else {
      setShow(true)
    }
  }, [])  
  
  console.log(show);

  return (
    <div className="flex">
      <SideBar className={`${show ? "visible" : "hidden"}`}/>
      <Router className="fixed"/>
    </div>
  )
}
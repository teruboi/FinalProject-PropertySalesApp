// Importing npm modules
import React, { useState, useEffect } from "react";

// Importing local components
import SideBar from './components/sidebar'
import Router from './router'

export default function App() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (window.location.href === "http://192.168.1.13:5173/" ||
    window.location.href === "http://192.168.1.13:5173/login" ||
    window.location.href === "http://192.168.1.13:5173/register") {
      setShow(false)
    } else {
      setShow(true)
    }
  }, [])

  // console.log(window.location.href);

  return (
    <div className="flex">
      <SideBar className={`${show ? "visible" : "hidden"}`}/>
      <Router />
    </div>
  )
}
// Importing npm modules
import React from "react";

// Importing local components
import SideBar from './components/sidebar'
import Router from './router'

export default function App() {
  let show = false

  if (window.location.href.indexOf('landing') > -1) {
    show = true
  } else {
    show = false
  }

  return (
    <div className="flex">
      <SideBar className={`${show ? "hidden" : "visible"}`}/>
      <Router />
    </div>
  )
}
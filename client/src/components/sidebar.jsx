import { useState, useEffect } from 'react'
import { FaBars, FaWindowClose, FaHome, FaPlus, FaBell, FaSun, FaMoon, FaPersonBooth } from 'react-icons/fa'
import { RiShutDownLine } from 'react-icons/ri'
import { MdClose } from 'react-icons/md'
import { BsPerson } from 'react-icons/bs'

export default function Sidebar(avatar, name) {
    const [dark, setDark] = useState(false)
    const [hide, setHide] = useState(true)
    const iconStyle = { width: '24px', height: '24px', color: '#f0f0f0', borderColor: "#f0f0f0" }

    useEffect(() => {
        if(window.location.href.includes('?landing') ||
        window.location.href.includes('login') ||
        window.location.href.includes('register')) {
            setHide(true)
        } else {
            setHide(false)
        }

        if(document.documentElement.classList.contains('dark')) {
            setDark(true)
        }
    });

    console.log(hide);

    return (
        <aside className={`${hide ? 'hidden' : 'visible'}`} >
            <div className="sidebar">
                <div className="sidebar-blocks">
                    <div className='bg-white px-1 py-1 rounded-xl'>
                        <img src='/listingan-com-logo.png' />
                    </div>
                </div>
                <div className='sidebar-blocks'>
                    <a href="/catalog">
                        <div className='nav-option'>
                            <div>Catalog</div>
                            <div><FaHome style={iconStyle} /></div>
                        </div>
                    </a>
                    <a href="/products/add">
                        <div className='nav-option'>
                            <div>Add new property</div>
                            <div><FaPlus style={iconStyle} /></div>
                        </div>
                    </a>
                    <a href="/profile">
                        <div className='nav-option top'>
                            <div>Profile</div>
                            <div><BsPerson style={iconStyle} /></div>
                        </div>
                    </a>
                    <a href="/notification">
                        <div className='nav-option'>
                            <div>Notification</div>
                            <div><FaBell style={iconStyle} /></div>
                        </div>
                    </a>
                </div>
                <div className='nav-option'>
                    <div>Log out</div>
                    <div><RiShutDownLine style={iconStyle} /></div>
                </div>
                <button type='button' className="w-full py-5" onClick={() => {
                    document.documentElement.classList.toggle("dark")
                    setDark(!dark)
                    if(dark){
                        document.querySelector("#toggleBtn").classList.add("float-left")
                        document.querySelector("#toggleBtn").classList.remove("float-right")
                    } else {
                        document.querySelector("#toggleBtn").classList.add("float-right")
                        document.querySelector("#toggleBtn").classList.remove("float-left")
                    }
                    }}>
                    <div className='flex justify-center items-center'>
                        <FaSun style={iconStyle} />
                        <div className="mx-2 rounded-full w-20 h-fit py-2 px-2 bg-gray-800 hover:border-4 border-spacing-3 border-purple-500/50">
                            <div id="toggleBtn" className="rounded-full h-5 w-5 bg-white transition-all" />
                        </div>
                        <FaMoon style={iconStyle} />
                    </div>
                </button>
            </div>
        </aside>
    )
}
import { useState, useEffect } from 'react'
import { FaBars, FaWindowClose, FaHome, FaPlus, FaBell, FaSun, FaMoon } from 'react-icons/fa'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { MdClose } from 'react-icons/md'

export default function Sidebar(avatar, name) {
    const [dark, setDark] = useState(false)
    const [hide, setHide] = useState(true)
    const iconStyle = { width: '24px', height: '24px', color: '#f0f0f0', borderColor: "#f0f0f0" }

    useEffect(() => {
        if(window.location.href.includes('landing') ||
        window.location.href.includes('login') ||
        window.location.href.includes('register')) {
            setHide(true)
        } else {
            setHide(false)
        }
    });

    console.log(hide);

    return (
        <aside className={`${hide ? 'hidden' : 'visible'}`} >
            <div className="sidebar">
                <div className="sidebar-blocks">
                    <div className='bg-white px-1 py-1 rounded-xl'>
                        <img src='listingan-com-logo.png' />
                    </div>
                </div>
                <div className='sidebar-blocks'>
                    <ul>
                        <div className='nav-option'>
                            <div>Home</div>
                            <div><FaHome style={iconStyle} /></div>
                        </div>
                        <div className='nav-option'>
                            <div>Home</div>
                            <div><FaHome style={iconStyle} /></div>
                        </div>
                        <div className='nav-option top'>
                            <div>Home</div>
                            <div><FaHome style={iconStyle} /></div>
                        </div>
                        <div className='nav-option'>
                            <div>Home</div>
                            <div><FaHome style={iconStyle} /></div>
                        </div>
                    </ul>
                </div>
                <button type='button' onClick={() => {
                    document.documentElement.classList.toggle("dark")
                    setDark(!dark)
                    }}>
                    {dark ? <FaMoon /> :<FaSun />}
                </button>
            </div>
        </aside>
    )
}
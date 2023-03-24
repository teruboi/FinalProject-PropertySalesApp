import { useState } from "react"

export default function main() {
    const [login, setLogin] = useState(true)
    return (
        <>
            <div className="container flex m-auto items-center h-screen">
                <div className="login-box">
                    <div className="form px-4 py-2">
                        <h1 className="text-4xl font-extrabold">{login ? "Log In" : "Register"}</h1>
                        <form action="/login" method="post" className="grid grid-flow-row mt-4 gap-y-2">
                            <label htmlFor="email" className="dark:text-black">Email</label>
                            <input type="email" name="email" id="email" placeholder="Enter your email..." />
                            <label htmlFor="password" className="dark:text-black">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter your password" />
                            <button type="submit" className="w-20 justify-self-end bg-lightMain dark:bg-darkMain dark:text-white">Sign In</button>
                        </form>
                        <div className="sidebar-blocks -mt-6"></div>
                        or
                        <a href="#">
                             
                        </a>
                        If you want to register, consider asking your agency to <a>register your account</a> or <a href="#" className="font-semibold shadow-md" onClick={() => setLogin(false)}>register your own agency</a> then register an account
                    </div>
                </div>
            </div>
        </>
    )
}
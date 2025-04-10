"use client"

import { useContext } from "react";
import { UserContext } from '../context/UserContext';

export default function LoginButton() {
    const { setUser } = useContext(UserContext)
    function handleLogin() {
        setUser('user123');
    }

    return (
        <button onClick={handleLogin} className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4
         border-blue-700 hover:border-blue-500 hover:cursor-pointer rounded">Login</button>
    )
}
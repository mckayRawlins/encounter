"use client"

import { useContext } from "react";
import { UserContext } from '../context/UserContext';

export default function LoginButton() {
    const { setUser } = useContext(UserContext)
    function handleLogin() {
        setUser('user123');
    }

    return (
        <button onClick={handleLogin}>Login</button>
    )
}
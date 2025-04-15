"use client";

import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function LoginButton() {
  const { setUser } = useContext(UserContext);
  function handleLogin() {
    setUser("user123");
  }

  return (
    <button
      onClick={handleLogin}
      className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4
         border-red-700 hover:border-red-500 hover:cursor-pointer rounded"
    >
      Login
    </button>
  );
}

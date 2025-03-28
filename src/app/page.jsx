"use client"

import Image from "next/image";
import Link from "next/link";
import LoginButton from "./components/LoginButton";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";

export default function Home() {
  const { user } = useContext(UserContext);
  return (
    <main className="flex flex-col h-dvh justify-center items-center">
      <h1 className="text-5xl m-3">Welcome, {user}</h1>
      <div>
        {user ? <Link href="/monsters" className="bg-black text-white m-3 p-2">Go to created encounters</Link> : <LoginButton />}
      </div>
    </main>
  );
}

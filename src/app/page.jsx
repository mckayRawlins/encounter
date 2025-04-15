"use client";

import Image from "next/image";
import Link from "next/link";
import LoginButton from "./_components/LoginButton";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";

export default function Home() {
  const { user } = useContext(UserContext);
  return (
    <main className="flex h-[calc(100dvh-50px)] justify-center items-center bg-[url('/dnd_logo.png')] bg-no-repeat bg-top overflow-hidden">
      <div className="flex flex-col items-center justify-evenly bg-black/50 bg-blur-lg h-1/2 p-5 rounded-lg">
        <h1 className="text-5xl m-3 text-white font-bold font-serif">
          Welcome, {user ? user : "guest"}
        </h1>
        <div>
          {user ? (
            <Link
              href="/encounters"
              className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4
            border-red-700 hover:border-red-500 hover:cursor-pointer rounded"
            >
              Go to created encounters
            </Link>
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </main>
  );
}

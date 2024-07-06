"use client"

import Link from "next/link"
import Search from "./search"
import { LucideLogOut, LucideMessageSquareQuote } from "lucide-react"
import { Button } from "./ui/button"
import { signIn, signOut, useSession } from "next-auth/react";

export default function Sidebar() {
    const session = useSession();
    console.log(session);


    return (
        <aside className="fixed top-0 left-0 z-40 w-72 h-screen pt-6 pb-4 px-2 transition-transform -translate-x-full bg-white border-r border-gray-100 sm:translate-x-0">
            <div className="flex justify-center items-center gap-2 mb-6">
                <LucideMessageSquareQuote className="text-blue-300 mt-1" />
                <Link href="/">
                    <h1 className="font-bold font-sans text-2xl bg-gradient-to-br from-blue-500 to-teal-400 text-transparent bg-clip-text">Chit-Chat</h1>
                </Link>
            </div>
            <Search />
            <div className="space-y-2 overflow-y-auto overflow-x-hidden">
                <Link href="/chat">
                    <div className="flex items-center gap-4 w-full py-3 px-4 mb-2 rounded-lg cursor-pointer hover:bg-gray-200">
                        <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                        <div className="w-[55%]">
                            <h1 className="font-semibold text-sm text-gray-600">John Doe</h1>
                            <p className="text-xs text-gray-500 truncate">Lorem ipsum dolor sit amet dolor ipsumdsadsadadasdasd</p>
                        </div>
                        <div className="w-1/5">
                            <p className="text-[0.6rem] text-gray-400">5m Ago</p>
                        </div>
                    </div>
                </Link>
                <hr />
                <Link href="/chat">
                    <div className="flex items-center gap-3 w-full py-3 px-4 mb-2 rounded-lg cursor-pointer hover:bg-gray-200">
                        <div className="w-8 h-8 rounded-full bg-pink-500"></div>
                        <div className="w-[55%]">
                            <h1 className="font-semibold text-sm text-gray-600">Jane Dae</h1>
                            <p className="text-xs text-gray-500 truncate">Lorem ipsum dolor sit amet</p>
                        </div>
                        <div className="w-1/5">
                            <p className="text-[0.6rem] text-gray-400">10m Ago</p>
                        </div>
                    </div>
                </Link>
                <hr />
            </div>

            <div className="absolute w-full bottom-0 left-0 flex items-center p-2 border-t-[1px]">
                {session?.status === "loading" ? (
                    <div className="flex gap-4 p-4">
                        <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
                        <div className="w-1/2 space-y-2">
                            <div className="w-14 h-3 bg-gray-300 rounded-full animate-pulse"></div>
                            <div className="w-24 h-3 bg-gray-300 rounded-full animate-pulse"></div>
                        </div>
                        <div className="w-9 h-9 bg-gray-300 rounded-lg animate-pulse"></div>
                    </div>
                ) : null}
                {session?.status === "unauthenticated" ? (
                    <div className="flex justify-center items-center gap-2 p-4 w-full">
                        <Button onClick={() => signIn()} className="bg-blue-500 hover:bg-blue-400">Sign In</Button>
                        <Link href="/auth/register">
                            <Button variant="secondary">Sign Up</Button>
                        </Link>
                    </div>
                ) : null}
                {session?.status === "authenticated" ? (
                    <div className="flex gap-4 p-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500"></div>
                        <div className="w-1/2">
                            <h1 className="font-semibold text-sm text-gray-600">{session?.data?.user?.name || "Guest"}</h1>
                            <p className="text-xs text-gray-500">{session?.data?.user?.email || "Guest"}</p>
                        </div>
                        <Button onClick={() => signOut()} className="bg-transparent text-red-500 hover:bg-gray-100"><LucideLogOut size={18} /></Button>
                    </div>
                ) : null}
            </div>
        </aside>
    )
}

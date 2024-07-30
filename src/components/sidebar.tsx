import Link from "next/link"
import { LucideEdit3, LucideMessageSquareQuote } from "lucide-react"
import useGetSession from "@/hooks/sessions/useGetSession";
import UserProfile from "./users/user-profile";
import UserAuthButton from "./users/user-auth-button";
import ChatsList from "./chat/chats-list";

export default async function Sidebar() {
    const session = await useGetSession();

    return (
        <aside className="fixed top-0 left-0 z-40 w-full sm:w-80 h-screen pt-6 pb-4 px-2 transition-transform bg-white border-r border-gray-100 sm:translate-x-0">
            <div className="flex justify-center items-center gap-2 mb-6">
                <LucideMessageSquareQuote className="text-blue-300 mt-1" />
                <Link href="/">
                    <h1 className="font-bold font-sans text-2xl bg-gradient-to-br from-blue-500 to-teal-400 text-transparent bg-clip-text">Chit-Chat</h1>
                </Link>
            </div>
            <ChatsList />
            <Link href="/peoples">
                <button className="absolute bottom-28 sm:bottom-24 right-4 sm:right-2 bg-blue-500 text-white p-5 sm:p-4 rounded-full z-50 hover:bg-blue-400 cursor-pointer"><LucideEdit3 size={16} /></button>
            </Link>
            <div className="absolute w-full bottom-0 left-0 flex items-center p-2 border-t-[1px]">
                {!session ? (
                    <UserAuthButton />
                ) : null}
                {session ? (
                    <UserProfile session={session} />
                ) : null}
            </div>
        </aside>
    )
}

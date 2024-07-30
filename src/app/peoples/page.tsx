import UserAuthButton from '@/components/users/user-auth-button'
import UserProfile from '@/components/users/user-profile'
import useGetSession from '@/hooks/sessions/useGetSession'
import { LucideMessageSquareQuote } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import WelcomeImage from "../../../public/images/welcome.svg";
import { useGetAllUsers } from '@/hooks/users/useGetAllUsers'
import PeoplesWrapper from '@/components/peoples-wrapper'

export default async function PeoplesPage() {
    const session = await useGetSession();
    const users = await useGetAllUsers();

    return (
        <main>
            <aside className="fixed top-0 left-0 z-40 w-full sm:w-80 h-screen pt-6 pb-4 px-2 transition-transform bg-white border-r border-gray-100 sm:translate-x-0">
                <div className="flex justify-center items-center gap-2 mb-6">
                    <LucideMessageSquareQuote className="text-blue-300 mt-1" />
                    <Link href="/">
                        <h1 className="font-bold font-sans text-2xl bg-gradient-to-br from-blue-500 to-teal-400 text-transparent bg-clip-text">Chit-Chat</h1>
                    </Link>
                </div>
                <PeoplesWrapper users={users.map(user => ({
                    ...user,
                    password: ""
                }))} />
                <div className="absolute w-full bottom-0 left-0 flex items-center p-2 border-t-[1px]">
                    {!session ? (
                        <UserAuthButton />
                    ) : null}
                    {session ? (
                        <UserProfile session={session} />
                    ) : null}
                </div>
            </aside>
            <div className="flex justify-center items-center h-screen p-6 sm:ml-80 bg-slate-100">
                <Image src={WelcomeImage} alt="welcome-image" width={500} height={500} />
            </div>
        </main>
    )
}

"use client"

import { useState } from 'react'
import Search from './search'
import UsersList from './users/users-list'
import DialogCreateGroup from './chat/dialog-create-group'
import { User } from '@prisma/client'
import Link from 'next/link'
import { LucideChevronLeft } from 'lucide-react'

export default function PeoplesWrapper({ users }: { users: User[] }) {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="mx-4 sm:mx-2 px-2 sm:px-0 space-y-2">
            <div className="flex sm:hidden mb-4">
                <Link href="/" className="block sm:hidden">
                    <button className="p-2 rounded-full hover:bg-slate-100"><LucideChevronLeft /></button>
                </Link>
                <h1 className="pl-2 py-2 font-semibold text-lg">Peoples</h1>
            </div>
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <h1 className="hidden sm:block pl-2 py-2 font-semibold text-lg">Peoples</h1>
            <DialogCreateGroup initialItems={users} />
            <UsersList users={filteredUsers} />
        </div>
    )
}
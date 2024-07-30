"use client"

import useCreateChat from "@/hooks/chats/useCreateChat"
import { User } from "@prisma/client";

type UserItemProps = {
    user: User;
}

export default function UserItem({ user }: UserItemProps) {
    const { mutate: onCreateChat } = useCreateChat();

    return (
        <div>
            <div onClick={() => onCreateChat(user?.id)} className="flex items-center gap-4 w-full py-3 px-4 mb-2 rounded-lg cursor-pointer hover:bg-gray-200">
                <div className="w-8 h-8 rounded-full bg-blue-500"></div>
                <h1 className="font-semibold text-sm text-gray-600">{user?.username}</h1>
            </div>
            <hr />
        </div>
    )
}

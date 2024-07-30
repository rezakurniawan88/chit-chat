"use client"

import Link from "next/link";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { FullChatType } from "@/types";
import useAcronymUser from "@/hooks/useAcronymUser";
import { useSession } from "next-auth/react";

export default function ChatItem({ chat, currentUser, otherUser }: any) {
    const [items, setItems] = useState(chat);
    const session = useSession();
    const acronymUser = useAcronymUser(chat?.name || otherUser);

    const lastMessage = useMemo(() => {
        const messages = items.messages || [];

        return messages[messages.length - 1];
    }, [items.messages]);

    const userEmail = useMemo(() => {
        return session?.data?.user?.email;
    }, [session?.data?.user?.email]);

    const hasSeen = useMemo(() => {
        if (!lastMessage) {
            return false;
        }

        const seenArray = lastMessage.seen || [];

        if (!userEmail) {
            return false;
        }

        return seenArray.filter((user: any) => user.email === userEmail).length !== 0;
    }, [userEmail, lastMessage]);

    const lastMessageBody = useMemo(() => {
        if (lastMessage?.body) {
            return lastMessage?.body;
        }

        return "Start a chat"
    }, [lastMessage?.body])

    const pusherId = useMemo(() => {
        return currentUser;
    }, [currentUser]);

    useEffect(() => {
        if (!pusherId) {
            return;
        }

        pusherClient.subscribe(pusherId);

        const updateHandler = (chat: FullChatType) => {
            setItems((currentChat: any) => {
                if (currentChat.id === chat.id) {
                    return {
                        ...currentChat,
                        messages: chat.messages
                    }
                }

                return currentChat;
            });
        }

        pusherClient.bind("chat:update", updateHandler);

        return () => {
            pusherClient.unsubscribe(pusherId);
            pusherClient.unbind("chat:update", updateHandler);
        }
    }, [pusherId])

    return (
        <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div className="flex justify-between items-center gap-4 w-full py-3 px-4 my-2 rounded-lg cursor-pointer hover:bg-gray-200">
                <div className="flex items-center gap-4 sm:gap-3">
                    <div className="flex justify-center items-center w-10 h-10 rounded-full bg-slate-300 text-slate-900">{acronymUser}</div>
                    <div>
                        <h1 className="font-semibold text-sm text-gray-600">{chat?.name || otherUser}</h1>
                        <p className={`text-xs truncate ${hasSeen ? "text-gray-500" : "text-black font-semibold"}`}>{lastMessageBody}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <p className="text-[0.6rem] text-gray-400">{format(new Date(items?.lastMessage), "p")}</p>
                </div>
            </div>
            <hr />
        </Link>
    )
}

"use client";

import { pusherClient } from "@/lib/pusher";
import { FullMessageType } from "@/types";
import { find } from "lodash";
import { useEffect, useRef, useState } from "react";
import MessageBox from "../message/message-box";
import { axiosInstance } from "@/lib/axios";
import useGetOtherUser from "@/hooks/users/useGetOtherUser";
import { Conversation, User } from "@prisma/client";

interface BodyChatProps {
    chat: Conversation & {
        users: User[]
    }
    initialMessages: FullMessageType[];
    chatId: string;
}

export default function BodyChat({ chat, initialMessages, chatId }: BodyChatProps) {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);
    const otherUser = useGetOtherUser(chat);

    useEffect(() => {
        pusherClient.subscribe(chatId);
        bottomRef?.current?.scrollIntoView({ behavior: "smooth" });

        const messageHandler = (message: FullMessageType) => {
            axiosInstance.post(`/chats/${chatId}/seen`);
            setMessages((current) => {
                if (find(current, { id: message.id })) {
                    return current;
                }

                return [...current, message];
            });

            bottomRef?.current?.scrollIntoView({ behavior: "smooth" });
        }

        const updateMessageHandler = (newMessage: FullMessageType) => {
            setMessages((current) => {
                return current.map(message => {
                    if (message.id === newMessage.id) {
                        return newMessage;
                    }
                    return message;
                });
            });
        }

        pusherClient.bind("message:new", messageHandler);
        pusherClient.bind("message:update", updateMessageHandler);

        return () => {
            pusherClient.unsubscribe(chatId);
            pusherClient.unbind("message:new", messageHandler);
            pusherClient.unbind("message:update", updateMessageHandler);
        }
    }, [chatId, messages])

    return (
        <div className="py-24 px-2 space-y-2">
            {messages.map((message, index) => (
                <MessageBox
                    key={message.id}
                    message={message}
                    otherUser={otherUser}
                    isLastMessage={index === messages.length - 1}
                />
            ))}

            <div ref={bottomRef} className="pt-24" />
        </div>
    )
}

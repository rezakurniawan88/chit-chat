import { Conversation, Message, User } from "@prisma/client";

export type FullMessageType = Message & {
    sender: User,
    seen: User[]
}

export type FullChatType = Conversation & {
    users: User[],
    messages: FullMessageType[]
}

export type UserType = {
    id: string,
    username: string,
    email: string,
    image: string,
    createdAt: string,
    updatedAt: string
}
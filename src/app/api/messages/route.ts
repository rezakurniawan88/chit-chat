import { useGetCurrentUser } from "@/hooks/users/useGetCurrentUser";
import prisma from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const currentUser = await useGetCurrentUser();
        const { message, chatId } = await req.json();

        if (!currentUser?.email || !currentUser.id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                conversation: {
                    connect: {
                        id: chatId
                    }
                },
                sender: {
                    connect: {
                        id: currentUser?.id
                    }
                },
                seen: {
                    connect: {
                        id: currentUser?.id
                    }
                }
            },
            include: {
                sender: true,
                seen: true
            }
        });

        const updateChat = await prisma.conversation.update({
            where: {
                id: chatId
            },
            data: {
                lastMessage: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        });

        await pusherServer.trigger(chatId, "message:new", newMessage);

        const lastMessage = updateChat.messages[updateChat.messages.length - 1];

        updateChat.users.map((user) => {
            pusherServer.trigger(user.email!, "chat:update", {
                id: chatId,
                messages: [lastMessage]
            })
        });

        return NextResponse.json({ data: newMessage, message: "Message sent" });
    } catch (error) {
        console.log("error_message", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
import { useGetCurrentUser } from "@/hooks/users/useGetCurrentUser";
import prisma from "@/lib/prisma";
import { pusherServer } from "@/lib/pusher";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { chatId: string } }) {
    try {
        const currentUser = await useGetCurrentUser();
        const { chatId } = params;

        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const chat = await prisma.conversation.findUnique({
            where: {
                id: chatId
            },
            include: {
                messages: {
                    include: {
                        seen: true
                    }
                },
                users: true
            }
        });
        
        if(!chat) {
            return new NextResponse("Invalid ID", { status: 400 });
        }

        const lastMessage = chat.messages[chat.messages.length - 1];

        if(!lastMessage) {
            return NextResponse.json(chat);
        }
        
        const updateMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                sender: true,
                seen: true
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        });

        await pusherServer.trigger(currentUser?.email, "chat:update", {
            id: chatId,
            messages: [updateMessage]
        });

        if(lastMessage?.seenIds.indexOf(currentUser?.id) !== -1) {
            return NextResponse.json(chat);
        };

        await pusherServer.trigger(chatId, "message:update", updateMessage);

        return NextResponse.json(updateMessage);
    } catch (error) {
        console.log(error, "ERROR_MESSAGE_SEEN");
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
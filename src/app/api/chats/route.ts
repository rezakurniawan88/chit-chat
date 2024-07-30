import { useGetCurrentUser } from "@/hooks/users/useGetCurrentUser";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get all conversations
// export async function GET() {
//     try {
//         const conversations = await prisma.conversation.findMany({
//             orderBy: {
//                 createdAt: "desc"
//             },
//             include: {
//                 users: true
//             }
//         });

//         return NextResponse.json(conversations);
//     } catch (error) {
//         console.log(error);
        
//     }
// }

// Create a new conversation
export async function POST(req: Request) {
    try {
        const currentUser = await useGetCurrentUser();
        const { userId, isGroup, members, groupName } = await req.json();

        if(!currentUser?.id || !currentUser?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(isGroup && (!members || members?.length < 2 || !groupName)) {
            return new NextResponse("Bad Request", { status: 400});
        }

        if(isGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name: groupName,
                    isGroup,
                    users: {
                        connect: [
                            ...members.map((member: any) => ({ 
                                id: member.id
                            })),
                            {
                                id: currentUser?.id
                            }
                        ],
                    }
                },
                include: {
                    users: true
                }
            });

            return NextResponse.json(newConversation);
        }

        const existingConversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser?.id, userId]
                        }
                    },
                    {
                        userIds: {
                            equals: [userId, currentUser?.id]
                        }
                    }
                ]
            }
        });

        const singleConversation = existingConversations[0];

        if(singleConversation) {
            return NextResponse.json(singleConversation);
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser?.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        });

        return NextResponse.json(newConversation);
    } catch (error) {
        console.log(error, "CREATE_CHAT_ERROR");
        return new NextResponse("Internal Server Error", { status: 500});
    }
}

// Delete a conversation
export async function DELETE(req: Request) {
    try {
        const { chatId } = await req.json();

        await prisma.conversation.delete({
            where: {
                id: chatId
            }
        });

        return NextResponse.json({ message: "Chat deleted" });
    } catch (error) {
        console.log(error, "DELETE_CHAT_ERROR");
        return new NextResponse("Internal Server Error", { status: 500});
    }
}
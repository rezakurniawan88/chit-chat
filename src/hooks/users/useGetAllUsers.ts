import prisma from "@/lib/prisma";
import useGetSession from "../sessions/useGetSession";

export async function useGetAllUsers() {
    const session = await useGetSession();

    if(!session?.user?.email) {
        return [];
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                NOT: {
                    email: session?.user?.email
                }
            },
            select: {
                id: true,
                username: true,
                email: true,
                image: true,
                createdAt: true,
                updatedAt: true,
                conversationIds: true,
                conversations: true,
                seenMessageIds: true,
                seenMessages: true,
                messages: true
            }
        });

        return users;
    } catch (error: any) {
        return [];
    }
}
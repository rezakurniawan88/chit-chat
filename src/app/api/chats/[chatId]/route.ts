import { useGetCurrentUser } from "@/hooks/users/useGetCurrentUser";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get conversations by chatId
export async function GET(req: Request, { params }: { params: { chatId: string } }) {
    try {
        const currentUser = await useGetCurrentUser();
        const { chatId } = params;

        if(!currentUser?.email) {
            return null;
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id: chatId
            },
            include: {
                users: true
            }
        });

        return NextResponse.json({ data: conversation});
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
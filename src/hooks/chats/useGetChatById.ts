import prisma from "@/lib/prisma";
import { useGetCurrentUser } from "../users/useGetCurrentUser";

const useGetChatById = async (chatId: string) => {
    try {
        const currentUser = await useGetCurrentUser();

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

        return conversation;
    } catch (error) {
        console.log(error);
    }
}

export default useGetChatById;
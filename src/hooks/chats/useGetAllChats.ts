import prisma from "@/lib/prisma";
import { useGetCurrentUser } from "../users/useGetCurrentUser";

const useGetAllChats = async () => {
    try {
        const currentUser = await useGetCurrentUser();

        if(!currentUser?.email) {
            return null;
        };

        const chats = await prisma.conversation.findMany({
            where: {
                users: {
                    some: {
                        email: currentUser?.email
                    }
                }
            },
            include: {
                users: true,
                messages: true
            }
        });

        return chats;
    } catch (error) {
        console.log(error);
    }
}

export default useGetAllChats;
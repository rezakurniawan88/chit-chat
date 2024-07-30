import prisma from "@/lib/prisma";

const useGetMessagesById = async (chatId: string) => {
    try {
        const messages = await prisma.message.findMany({
            where: {
                conversationId: chatId
            },
            include: {
                sender: true,
                seen: true
            },
            orderBy: {
                createdAt: "asc"
            }
        })
        return messages;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export default useGetMessagesById;
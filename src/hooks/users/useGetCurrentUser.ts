import prisma from "@/lib/prisma";
import useGetSession from "../sessions/useGetSession";

export async function useGetCurrentUser() {
    try {
        const session = await useGetSession();

        if(!session?.user?.email) {
            return null;
        }

        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email as string
            }
        });

        if(!currentUser) {
            return null;
        }

        return currentUser;
    } catch (error: any) {
        return null;
    }
}
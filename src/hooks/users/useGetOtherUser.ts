import { useMemo } from "react";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { FullChatType } from "@/types";

const useGetOtherUser = (chat: FullChatType | { users: User[] }) => {
    const session = useSession();

    const otherUser = useMemo(() => {
        const currentUserEmail = session?.data?.user?.email;
        const otherUserFilter = chat.users.filter((user) => user.email!== currentUserEmail);
        return otherUserFilter[0];
    },[session?.data?.user?.email, chat.users]);

    return otherUser;
}

export default useGetOtherUser;
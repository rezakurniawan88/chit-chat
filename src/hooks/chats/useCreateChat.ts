"use client";

import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useMutation } from "react-query";

const useCreateChat = () => {
    const router = useRouter();

    return useMutation({
        mutationKey: "createConversation",
        mutationFn: async (userId: string) => {
            const result = await axiosInstance.post("/chats", { userId });
            return result?.data;
        },
        onSuccess: (data) => {
            router.push(`/chat/${data?.id}`);
        },
        onError: (error) => {
            console.log(error);
        }
    });
}

export default useCreateChat;
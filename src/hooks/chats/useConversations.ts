import { useParams } from "next/navigation"
import { useMemo } from "react";

const useConversation = () => {
    const params = useParams();

    const chatId = useMemo(() => {
        if(!params?.chatId) {
            return '';
        }

        return params?.chatId as string
    }, [params?.chatId]);

    return useMemo(() => ({
        chatId
    }), [chatId]);
}

export default useConversation;
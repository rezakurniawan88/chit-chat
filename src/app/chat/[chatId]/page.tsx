import Sidebar from "@/components/sidebar";
import useGetChatById from "@/hooks/chats/useGetChatById";
import useGetMessagesById from "@/hooks/chats/useGetMessagesById";
import HeaderChat from "@/components/chat/header-chat";
import SendChat from "@/components/chat/send-chat";
import BodyChat from "@/components/chat/body-chat";
import { redirect } from "next/navigation";

export default async function ChatPage({ params }: { params: { chatId: string } }) {
    const chat = await useGetChatById(params.chatId);

    if (!chat) {
        redirect("/");
    };

    const initialMessages = await useGetMessagesById(params.chatId);

    return (
        <main>
            <Sidebar />
            <div className="relative min-h-screen sm:ml-80 bg-slate-100 z-50">
                <HeaderChat chat={chat} />
                <BodyChat chat={chat} initialMessages={initialMessages} chatId={params.chatId} />
                <SendChat />
            </div>
        </main>
    )
}

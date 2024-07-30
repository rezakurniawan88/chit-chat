import useGetAllChats from "@/hooks/chats/useGetAllChats";
import { useGetCurrentUser } from "@/hooks/users/useGetCurrentUser";
import ChatItem from "./chat-item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default async function ChatsList() {
    const chats = await useGetAllChats();
    const user = await useGetCurrentUser();
    const currentUserEmail = user?.email;

    return (
        <Tabs defaultValue="personal" className="w-full">
            <TabsList className="w-[90%] ml-4 mb-2">
                <TabsTrigger value="personal" className="w-1/2">Personal</TabsTrigger>
                <TabsTrigger value="group" className="w-1/2">Group</TabsTrigger>
            </TabsList>
            <TabsContent value="personal">
                <div className="ml-4 mr-8 sm:mx-0 space-y-2 overflow-y-auto overflow-x-hidden">
                    {chats && chats?.length <= 0 ? (
                        <div className="flex items-center justify-center w-full h-40">
                            <p className="text-gray-500 text-sm">No Chats</p>
                        </div>
                    ) :
                        chats && chats.map((chat) => {
                            const otherUserFilter = chat.users.filter((user) => user.email !== currentUserEmail);

                            if (!chat.isGroup) {
                                return (
                                    <ChatItem key={chat.id} chat={chat} currentUser={currentUserEmail} otherUser={otherUserFilter[0]?.username} />
                                );
                            } else {
                                return null;
                            }

                        })
                    }
                </div>
            </TabsContent>
            <TabsContent value="group">
                <div className="ml-4 mr-8 sm:mx-0 space-y-2 overflow-y-auto overflow-x-hidden">
                    {chats && chats?.length <= 0 ? (
                        <div className="flex items-center justify-center w-full h-40">
                            <p className="text-gray-500 text-sm">No Chats</p>
                        </div>
                    ) :
                        chats && chats.map((chat) => {
                            const otherUserFilter = chat.users.filter((user) => user.email !== currentUserEmail);

                            if (chat.isGroup) {
                                return (
                                    <ChatItem key={chat.id} chat={chat} currentUser={currentUserEmail} otherUser={otherUserFilter[0]?.username} />
                                );
                            } else {
                                return null;
                            }

                        })
                    }
                </div>
            </TabsContent>
        </Tabs>
    )
}
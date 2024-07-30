"use client"

import React, { useState } from "react"
import { Conversation, User } from "@prisma/client"
import useGetOtherUser from "@/hooks/users/useGetOtherUser"
import useAcronymUser from "@/hooks/useAcronymUser"
import { LucideChevronLeft, LucideEllipsis, LucideInfo, LucideLoader2, LucideTrash } from "lucide-react"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { useMutation } from "react-query"
import { axiosInstance } from "@/lib/axios"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
import useActiveStatusList from "@/hooks/users/useActiveStatusList"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"

interface HeaderProps {
    chat: Conversation & {
        users: User[]
    }
}

const HeaderChat: React.FC<HeaderProps> = ({ chat }) => {
    const otherUser = useGetOtherUser(chat);
    const acronymUser = useAcronymUser(chat?.name || otherUser?.username);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const router = useRouter();
    const { members } = useActiveStatusList();
    const isActive = members.indexOf(otherUser?.email) !== -1;

    const { mutate: deleteChatHandler, isLoading: deleteChatIsLoading } = useMutation({
        mutationKey: "deleteChat",
        mutationFn: async (id: string) => {
            const result = await axiosInstance.delete("/chats", {
                data: {
                    chatId: id
                }
            });
            return result?.data?.message;
        },
        onSuccess: (data) => {
            toast.success(data);
            router.push("/");
        },
        onError: (error: any) => {
            console.log(error);
            toast.error(error);
        }
    })

    return (
        <div className="fixed top-0 -left-0 sm:ml-80">
            <div className="relative flex gap-4 items-center bg-white p-4 shadow-md w-screen">
                <div className="flex items-center justify-between gap-4 w-full sm:mr-80">
                    <div className="flex items-center gap-4 ml-0 sm:ml-4">
                        <Link href="/" className="block sm:hidden">
                            <button className="p-2 rounded-full hover:bg-slate-100"><LucideChevronLeft /></button>
                        </Link>
                        <div className="relative flex justify-center items-center w-10 h-10 rounded-full bg-slate-300 text-slate-900">{acronymUser}
                            {chat?.isGroup ? null : isActive ? (
                                <div className="absolute top-1 -right-1 flex justify-center items-center w-3 h-3 bg-white rounded-full">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                </div>
                            ) : (
                                <div className="absolute top-1 -right-1 flex justify-center items-center w-3 h-3 bg-white rounded-full">
                                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                                </div>
                            )}
                        </div>
                        <div>
                            <h1 className="font-semibold text-sm text-gray-600">{chat?.name || otherUser?.username}</h1>
                            <p className="text-xs text-gray-500">{chat?.isGroup ? `${chat?.userIds?.length} members` : isActive ? "Online" : "Offline"}</p>
                        </div>
                    </div>
                    <button onClick={() => setShowMenu(!showMenu)} className="p-2 mr-5 rounded-full hover:bg-slate-100"><LucideEllipsis /></button>
                </div>

                <div className={showMenu ? "absolute top-16 right-8 sm:right-[22rem] z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 overflow-hidden" : "hidden"}>
                    {chat?.isGroup ? (
                        <Sheet>
                            <SheetTrigger asChild>
                                <div className="flex gap-2 items-center px-4 py-3 text-sm hover:bg-slate-200 cursor-pointer">
                                    <LucideInfo size={16} />
                                    <h1>Detail Group</h1>
                                </div>
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader>
                                    <SheetTitle>Group Details</SheetTitle>
                                </SheetHeader>
                                <div className="flex flex-col gap-2 justify-center items-center py-8">
                                    <div className="flex justify-center items-center w-10 h-10 rounded-full bg-slate-300 text-slate-900">{acronymUser}</div>
                                    <h1 className="font-semibold text-sm text-gray-600">{chat?.name || otherUser?.username}</h1>
                                </div>
                                <h1 className="text-sm font-semibold">Members Detail</h1>
                                <div className="flex flex-col gap-5 py-4">
                                    {chat?.users.map((user, i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="flex justify-center items-center w-10 h-10 rounded-full bg-slate-300 text-slate-900">{user?.username?.split(/\s+/g).slice(0, 2).map((word: string | number[]) => word[0]).join('').toUpperCase()}</div>
                                            <h1 className="font-semibold text-sm text-gray-600">{user?.username}</h1>
                                        </div>
                                    )
                                    )}
                                </div>
                            </SheetContent>
                        </Sheet>
                    ) : null}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <div className="flex gap-2 items-center text-red-500 px-4 py-3 text-sm hover:bg-slate-200 cursor-pointer">
                                <LucideTrash size={16} />
                                <div className="text-sm">Delete All</div>
                            </div>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="max-w-md md:max-w-xl">
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure to delete all chat?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. and your chat will be delete permanently from our server.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteChatHandler(chat.id)} className="bg-red-500 hover:bg-red-800">{deleteChatIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Delete"}</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
        </div>
    )
}

export default HeaderChat;
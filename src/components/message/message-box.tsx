import { FullMessageType } from "@/types"
import { format } from "date-fns"
import { LucideCheck, LucideCheckCheck } from "lucide-react"
import { useSession } from "next-auth/react"

export default function MessageBox({ otherUser, message, isLastMessage }: { otherUser: any, message: FullMessageType, isLastMessage: boolean }) {
    const session = useSession();
    const seenList = (message.seen || [])
        .filter((user) => user.email !== message?.sender?.email)
        .map((user) => user.email)
        .join(", ");

    if (message?.senderId === session?.data?.id) {
        return (
            <div key={message.id} className="flex flex-col items-end gap-2 px-4">
                <div className="flex">
                    <div>
                        <div className="w-full min-w-20 max-w-sm bg-blue-400 p-4 rounded-lg text-white text-xs sm:text-sm break-words">
                            <h1>{message?.body}</h1>
                        </div>
                    </div>
                </div>
                <div className="flex items-end gap-2">
                    {seenList == otherUser?.email ? (
                        <LucideCheckCheck size={16} className="text-gray-400" />
                    ) : (
                        <LucideCheck size={16} className="text-gray-400" />
                    )}
                    <p className="text-xs text-slate-500">{format(new Date(message.createdAt), "p")}</p>
                </div>
            </div>
        )
    } else {
        return (
            <div key={message.id} className="flex flex-col gap-2 px-4">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-xs text-gray-400 mt-2 mb-1">{message?.sender?.username}</h1>
                        <div className="w-full min-w-20 max-w-sm bg-white p-4 rounded-lg text-black text-xs sm:text-sm break-words">
                            <h1>{message?.body}</h1>
                        </div>
                    </div>
                </div>
                <p className="text-xs text-slate-500">{format(new Date(message.createdAt), "p")}</p>
            </div>
        )
    }
}

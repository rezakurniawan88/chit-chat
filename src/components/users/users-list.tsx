import { ScrollArea } from "../ui/scroll-area";
import UserItem from "./user-item";

export default function UsersList({ users }: any) {
    return (
        <ScrollArea className="w-full h-80 max-h-full">
            <div className="space-y-2 overflow-y-auto overflow-x-hidden">
                {users?.length <= 0 ? (
                    <div className="flex items-center justify-center w-full h-40">
                        <p className="text-gray-500 text-sm">Login First To Start Chat</p>
                    </div>
                ) :
                    users.map((user: any) => (
                        <UserItem key={user.id} user={user} />
                    ))
                }
            </div>
        </ScrollArea>
    )
}
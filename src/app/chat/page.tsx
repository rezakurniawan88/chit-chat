import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LucideSend } from "lucide-react";

export default function ChatPage() {
    return (
        <main>
            <Sidebar />
            <div className="relative h-screen sm:ml-64 bg-slate-100">
                <div className="fixed top-0 left-0 bg-white p-4 rounded-lg shadow-md w-full sm:ml-64">
                    <div className="flex items-center gap-4 z-50">
                        <div className="w-10 h-10 rounded-full bg-blue-500"></div>
                        <h1 className="font-semibold text-sm text-gray-600">John Doe</h1>
                    </div>
                </div>

                <div className="pt-24 space-y-2">
                    <div className="flex flex-col items-end gap-2 px-4">
                        <div className="flex items-center gap-4">
                            <div>
                                <div className="w-full max-w-sm bg-blue-400 p-4 rounded-lg text-white text-sm">
                                    <h1>Hello, World</h1>
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-yellow-500"></div>
                        </div>
                        <p className="text-xs text-right text-slate-500 mr-14">Today 11:57</p>
                    </div>

                    <div className="flex flex-col gap-2 px-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-green-500"></div>
                            <div>
                                <div className="w-full max-w-sm bg-white p-4 rounded-lg text-black text-sm">
                                    <h1>Hello, Bounjour Ohayou</h1>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 ml-14">Today 11:57</p>
                    </div>
                </div>

                <div className="fixed bottom-0 left-0 flex gap-4 items-center bg-white p-4 shadow-md w-screen sm:ml-64">
                    <div className="flex items-center gap-4 w-full sm:mr-64">
                        <Input type="text" placeholder="Send your message ..." className="w-full p-5 text-sm" />
                        <Button className="p-4 bg-blue-600 hover:bg-blue-500"><LucideSend size={20} /></Button>
                    </div>
                </div>
            </div>
        </main>
    )
}

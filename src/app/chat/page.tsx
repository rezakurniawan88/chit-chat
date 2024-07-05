"use client"

import Sidebar from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideSend } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { axiosInstance } from "@/lib/axios";
import { pusherClient } from "@/lib/pusher";

export default function ChatPage() {
    // const [chats, setChats] = useState([]);
    // console.log("Chat res", chats);

    const formSchema = z.object({
        message: z.string().min(1),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
        },
    });

    // Pusher.logToConsole = true;

    // useEffect(() => {
    //     const channel = pusherClient
    //         .subscribe("chat")
    //         .bind("new-message", (data: any) => {
    //             console.log("test", data);
    //             setChats([...chats, data])
    //         });

    //     return () => {
    //         channel.unsubscribe();
    //     };
    // }, [chats]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        await axiosInstance.post("/pusher", { message: values.message }, {
            headers: {
                "Content-Type": "application/json",
            }
        });

        form.reset();
    };

    return (
        <main>
            <Sidebar />
            <div className="relative min-h-screen sm:ml-72 bg-slate-100">
                <div className="fixed top-0 left-0 bg-white p-4 rounded-lg shadow-sm w-full sm:ml-72 z-30">
                    <div className="flex items-center gap-4 ml-4">
                        <div className="w-10 h-10 rounded-full bg-blue-500"></div>
                        <h1 className="font-semibold text-sm text-gray-600">John Doe</h1>
                    </div>
                </div>

                <div className="py-24 px-2 space-y-2">
                    <div className="flex flex-col items-end gap-2 px-4">
                        <div className="flex items-center gap-4">
                            <div>
                                <div className="w-full min-w-20 max-w-sm bg-blue-400 p-4 rounded-lg text-white text-sm break-words">
                                    <h1>Hello world!</h1>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500">11:57 PM</p>
                    </div>

                    <div className="flex flex-col gap-2 px-4">
                        <div className="flex items-center gap-4">
                            <div>
                                <div className="w-full min-w-20 max-w-sm bg-white p-4 rounded-lg text-black text-sm break-words">
                                    <h1>Hello, Bounjour Ohayou</h1>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500">11:57 PM</p>
                    </div>

                    {/* <div>
                        {chats.map((chat: any) => (
                            <div
                                className="border border-slate-600 rounded p-2 m-2"
                                key={chat.date}>
                                {chat.message}
                                <br />
                                {chat.date}
                            </div>
                        ))}
                    </div> */}
                </div>

                <div className="fixed bottom-0 left-0 flex gap-4 items-center bg-white p-4 shadow-md w-screen sm:ml-72">
                    <div className="flex items-center gap-4 w-full sm:mr-72">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4 w-full">
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormControl>
                                                <Input type="text" placeholder="Send your message ..." className="w-full p-5 text-sm" {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" className="p-4 bg-blue-600 hover:bg-blue-500"><LucideSend size={20} /></Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </main>
    )
}

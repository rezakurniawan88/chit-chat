"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { axiosInstance } from "@/lib/axios";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LucideLoader2, LucideSend } from "lucide-react";
import useConversation from "@/hooks/chats/useConversations";
import { useMutation } from "react-query";

export default function SendChat() {
    const { chatId } = useConversation();
    const formSchema = z.object({
        message: z.string().min(1),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            message: "",
        },
    });

    const { mutate: sendMessageHandler, isLoading: sendMessageIsLoading } = useMutation({
        mutationKey: "sendMessage",
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            const result = await axiosInstance.post("/messages", { message: values.message, chatId }, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            return result?.data?.message;
        },
        onError: (error: any) => {
            console.log(error);
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        sendMessageHandler(values);
        form.reset();
    };

    return (
        <div className="fixed bottom-0 left-0 flex gap-4 items-center bg-white p-3 sm:p-4 shadow-md w-screen sm:ml-80">
            <div className="flex items-center w-full mr-4 sm:mr-[21rem]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-4 w-full">
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormControl>
                                        <Input type="text" placeholder="Send your message ..." className="w-full p-5 ml-1 text-sm focus-visible:ring-transparent" autoComplete="off" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="p-4 bg-blue-600 hover:bg-blue-500">{sendMessageIsLoading ? (<LucideLoader2 size={18} className="animate-spin" />) : <LucideSend size={18} />}</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

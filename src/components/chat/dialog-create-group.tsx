"use client"

import { LucideLoader2, LucidePlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Multiselect from "../select/multiselect";
import { useState } from "react";
import { Button } from "../ui/button";
import { useMutation } from "react-query";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DialogCreateGroup({ initialItems }: any) {
    const [items] = useState(initialItems);
    const [selectedItems, setSelectedItems] = useState([]);
    const router = useRouter();

    const formSchema = z.object({
        groupName: z.string().min(1),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            groupName: "",
        },
    });

    const { mutate: createGroupHandler, isLoading: createGroupIsLoading } = useMutation({
        mutationKey: "createGroup",
        mutationFn: async (values: z.infer<typeof formSchema>) => {
            const result = await axiosInstance.post("/chats", {
                isGroup: true,
                groupName: values.groupName,
                members: selectedItems
            });
            return result?.data;
        },
        onSuccess: (data) => {
            toast.success("Group created successfully");
            router.push(`/chat/${data?.id}`);
        },
        onError: (error: any) => {
            toast.error(error);
            console.log(error);
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        createGroupHandler(values);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex justify-center items-center gap-4 w-full py-3 px-4 mb-2 rounded-lg border cursor-pointer hover:bg-gray-200">
                    <LucidePlusCircle className="text-blue-500" size={16} />
                    <h1 className="font-semibold text-xs text-gray-600">Create New Group</h1>
                </div>
            </DialogTrigger>
            <DialogContent className="w-[90%] sm:w-full">
                <DialogHeader>
                    <DialogTitle>Create Group Chat</DialogTitle>
                    <DialogDescription>
                        Create your group to start chat
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-4 w-full">
                        <FormField
                            control={form.control}
                            name="groupName"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <FormLabel>Group Name</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Your group name" {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Multiselect
                            items={items}
                            selectedItems={selectedItems}
                            setSelectedItems={setSelectedItems}
                        />
                        <Button className="w-full bg-blue-500 hover:bg-blue-600" type="submit">{createGroupIsLoading ? (<LucideLoader2 size={16} className="animate-spin" />) : "Create Group"}</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

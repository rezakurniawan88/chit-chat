"use client"

import { signOut } from "next-auth/react";
import { Button } from "../ui/button";
import { LucideLogOut } from "lucide-react";
import useAcronymUser from "@/hooks/useAcronymUser";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";


export default function UserProfile({ session }: any) {
    const acronymUser = useAcronymUser(session?.user?.name);

    return (
        <div className="flex justify-between items-center gap-4 p-4 mx-4 sm:mx-0 w-full bg-white">
            <div className="flex gap-4">
                <div className="flex justify-center items-center w-10 h-10 rounded-full bg-slate-300 text-slate-900">{acronymUser}</div>
                <div>
                    <h1 className="font-semibold text-sm text-gray-600">{session?.user?.name || "Guest"}</h1>
                    <p className="text-xs text-gray-500">{session?.user?.email || "Guest"}</p>
                </div>
            </div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button className="bg-transparent text-red-500 hover:bg-gray-100"><LucideLogOut size={18} /></Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="max-w-md md:max-w-xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure yo want to logout?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => signOut()} className="bg-red-500 hover:bg-red-800">Logout</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

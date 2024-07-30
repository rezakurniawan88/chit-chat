"use client"

import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function UserAuthButton() {
    return (
        <div className="flex justify-center items-center gap-2 p-4 w-full">
            <Button onClick={() => signIn()} className="bg-blue-500 hover:bg-blue-400">Sign In</Button>
            <Link href="/auth/register">
                <Button variant="secondary">Sign Up</Button>
            </Link>
        </div>
    )
}

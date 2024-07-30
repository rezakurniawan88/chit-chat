import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function useGetSession() {
    return await getServerSession(authOptions);
}
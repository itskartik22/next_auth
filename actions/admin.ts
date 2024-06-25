"use server"
import { currentRole } from "@/lib/role";

export const admin = async () => {
    const role = await currentRole();
    if (role === "ADMIN") {
        return {success : "Allowed Access!"};
    }
    return {error : "You are not allowed!"};
}
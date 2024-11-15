"use server"

import { cookies } from "next/headers";

export const logout = async () => {
    try {
        const islem = cookies().delete("user");
        console.log("LOGOUT => ", islem);
        return true;
    } catch (error) {
        console.log("LOGOUT_ERROR => ", error);
        return false;
    }
}
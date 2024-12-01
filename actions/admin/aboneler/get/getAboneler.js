"use server"

import { db } from "@/lib/db";

export const getSubscriptions = async () => {
    try {
        const Subscribers = await db.Subscribers.findMany()
       
        return Subscribers;
    } catch (error) {
        console.log("GET_SUBS", error);
        return error;
    }
}
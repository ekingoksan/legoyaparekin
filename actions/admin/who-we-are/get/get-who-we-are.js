'use server'
// whoWeAre
import { db } from "@/lib/db";


export async function getWhoWeAre() {

    const result = await db.whoWeAre.findMany({
    })

    return result?.[0] ?? null

}
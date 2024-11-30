'use server'
// whoWeAre
import { db } from "@/lib/db";


export async function getHowItsWorks() {

    const result = await db.howItWorks.findMany({
    })

    return result?.[0] ?? null

}
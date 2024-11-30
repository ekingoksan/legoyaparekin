'use server'
// whoWeAre
import { db } from "@/lib/db";


export async function getWhoWeAre() {

    const result = await db.whoWeAre.findMany({
        orderBy: {
            created_at: 'desc'
        }
        
    })

    return result?.[0] ?? null

}
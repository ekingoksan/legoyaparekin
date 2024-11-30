

'use server';
import { db } from "@/lib/db";


export const getTeams = async () => {

    const teams = await db.myTeam.findMany({ })
    return teams

}
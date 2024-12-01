"use server"

import { db } from "@/lib/db";

export const getGenelDurumumuz = async () => {
    try {
        const generalStatus = await db.generalStatus.findMany({});
        
        if(generalStatus.length === 0){
            return {
                completed_projects: "",
                satisfied_customers: "",
                years_of_experience: "",
                customer_retention: "",
            }
        }

        return generalStatus[0];
    } catch (error) {
        console.log("getGenelDurumumuz", error);
        return error;
    }
}
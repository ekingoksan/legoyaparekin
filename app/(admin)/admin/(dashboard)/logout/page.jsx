"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation";
import { logout } from "@/actions/logout";


const LogoutPage = () => {

    const router = useRouter()

    const handleLogout = async () => {
        try {
            const status = await logout()
            if (status) {
                router.push("/admin/login")
            } else {
                console.log("Çıkış Yapılamadı")
            }
        } catch (error) {
            console.log("PAGE_ERROR => ", error)            
        }
    }

    useEffect(() => {
        handleLogout()
    }, [])

    return (
       <></>
    )
}

export default LogoutPage
"use client"

import Link from 'next/link';
import React from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function Navbar() {

    const router = useRouter()
    const handleLogout = async () => {
        try {
           const response = await axios.post("/api/logout")
              if (response.data.success) {
                router.push("/admin/login")
                router.refresh();
              } else {
                console.log("Çıkış Yapılamadı")
              }
        } catch (error) {
            console.log("PAGE_ERROR => ", error)            
        }
    }

  return (
    <div className="bg-[#343a40] flex justify-between items-center relative pe-2 py-2" id="navbar">
        <div className="flex justify-start py-1">
            <i className="bi bi-list text-white text-2xl cursor-pointer" id="navMenuIcon"></i>
        </div>
        <div>
            <i className="bi bi-person-circle text-white text-3xl cursor-pointer" id="profileButton"></i>
        </div>
        <div className="absolute bg-[#343a40] top-[50px] right-0 flex-col px-5 pt-3 text-white hidden" id="profile">
            <Link href="/admin/profile/edit" className="profile-link">
                <i className="bi bi-pencil-fill"></i>
                <span>Profilimi Düzenle</span>
            </Link>
            <div onClick={handleLogout} className="profile-link cursor-pointer">
                <i className="bi bi-box-arrow-right"></i>
                <span>Çıkış Yap</span>
            </div>
        </div>
    </div>
  )
}

export default Navbar
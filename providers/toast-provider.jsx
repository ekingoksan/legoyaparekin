"use client"

import { Toaster } from "react-hot-toast"

export const ToasterProvider = () => {
    // toast süresi, renkleri, konumu gibi ayarları buradan yapabilirsiniz.

    return <Toaster position="top-right" />
}

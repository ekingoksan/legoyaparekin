import Footer from "@/components/admin/Footer";
import Navbar from "@/components/admin/Navbar";
import Sidebar from "@/components/admin/Sidebar";
import Script from "next/script";
import "@/public/css/admin.css"


export default function RootLayout({ children }) {
  return (
    <>
        <div className="flex flex-row bg-gray-400 h-screen">
            <Sidebar />
            <div className="flex flex-col min-h-screen w-full overflow-y-auto">
                <Navbar />
                <div className="flex-1 flex w-full bg-[#f3f4f6] pt-5 pb-5 px-5">
                    <div className="w-full">
                        {children}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
        <Script strategy="afterInteractive" src="/js/admin.js" />
    </>
  );
}

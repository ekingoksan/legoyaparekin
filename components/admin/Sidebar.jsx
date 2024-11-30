import Link from 'next/link'
import React from 'react'
import { adminRoutes } from '@/routes/admin/routes' 

function Sidebar() {
  return (
    <div className="bg-[#343a40] sidebarOpen" id="sidebar">
      <div className="max-w-[300px] w-full" id="menu">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex items-center justify-between md:justify-center w-full relative">
            <img src="/images/logo.png" alt="logo" className="w-[150px] mx-auto mt-5" />
            {/* bootstrap icon x */}
            <i className="bi bi-x text-white text-2xl cursor-pointer flex md:hidden absolute right-0 top-2" id="menuIcon"></i>
          </div>
          <div className=" mt-5 flex flex-col justify-start w-full text-white" id='sidebarArea'>
            <ul>
              <li>
                <Link href={adminRoutes.dashboard} className="nav-link">
                    <i className="bi bi-house-door-fill"></i>
                    <p>
                      <span>Anasayfa</span>
                    </p>
                </Link>
              </li>
              <li>
                <Link href={adminRoutes.slider} className="nav-link">
                    <i className="bi bi-card-image"></i>
                    <p>
                      <span>Slider Yönetimi</span>
                    </p>
                </Link>
              </li>
              <li>
                <Link href={adminRoutes.biz_kimiz} className="nav-link">
                    <i className="bi bi-person-arms-up"></i>
                    <p>
                      <span>Biz Kimiz</span>
                    </p>
                </Link>
              </li>
              <li>
                <Link href={adminRoutes.blog} className="nav-link">
                    <i className="bi bi-file-earmark-fill"></i>
                    <p>
                      <span>Blog Yönetimi</span>
                    </p>
                </Link>
              </li>
              <li>
                <Link href={adminRoutes.portfolio} className="nav-link">
                    <i className="bi bi-bookmarks-fill"></i>
                    <p>
                      <span>Yaptığımız İşler</span>
                    </p>
                </Link>
              </li>
              <li>
                <Link href={adminRoutes.customer_review} className="nav-link">
                    <i className="bi bi-chat-left-fill"></i>
                    <p>
                      <span>Müşteri Yorumları</span>
                    </p>
                </Link>
              </li>
              <li>
                <Link href={adminRoutes.contact} className="nav-link">
                    <i className="bi bi-chat-left-fill"></i>
                    <p>
                      <span>Gelen Mesajlar</span>
                    </p>
                </Link>
              </li>
              <li className="nav-item">
                <Link href="#" className="nav-link">
                    <i className="bi bi-gear-fill"></i>
                    <p>
                      <span>Ayarlar</span>
                      <i className="bi-chevron-right"></i>
                    </p>
                </Link>
                <ul className="nav-treeview">
                  <li className="nav-item">
                    <Link href={adminRoutes.siteSettings} className="nav-link">
                        <i className="bi bi-circle"></i>
                        <p>
                          <span>Site Ayarları</span>
                        </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={adminRoutes.footerSettings} className="nav-link">
                        <i className="bi bi-circle"></i>
                        <p>
                          <span>Footer Ayarları</span>
                        </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={adminRoutes.socialSettings} className="nav-link">
                        <i className="bi bi-circle"></i>
                        <p>
                          <span>Sosyal Medya Ayarları</span>
                        </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={adminRoutes.seoSettings} className="nav-link">
                        <i className="bi bi-circle"></i>
                        <p>
                          <span>SEO Ayarları</span>
                        </p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href={adminRoutes.mailSettings} className="nav-link">
                        <i className="bi bi-circle"></i>
                        <p>
                          <span>Mail Ayarları</span>
                        </p>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
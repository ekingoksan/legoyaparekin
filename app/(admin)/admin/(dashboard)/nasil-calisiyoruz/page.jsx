'use server'
import React from 'react'
import { PageTitle } from '@/components/admin/PageTitle'
import Breadcrumb from '@/components/admin/Breadcrumb'
import { adminRoutes } from '@/routes/admin/routes'
import NasilCalisiyoruz from '@/components/admin/nasil-calisiyoruz/nasil-calisiyoruz'
function NailCalisiyoruzPage() {
  const breadcrumb = [
    {
      title: "Anasayfa",
      link: adminRoutes.dashboard
    },
    {
      title: "Nasıl Çalışıyoruz",
      link: adminRoutes.nasil_calisiyoruz
    }
  ]
  return (

    <div>
      <Breadcrumb data={breadcrumb} />

      <div className="custContainer">
          <PageTitle title="Nasil Çalışıyoruz" />
          <NasilCalisiyoruz />
      </div>
    </div>
  )
}

export default NailCalisiyoruzPage
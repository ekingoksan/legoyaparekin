'use server'
import React from 'react'
import { PageTitle } from '@/components/admin/PageTitle'
import Breadcrumb from '@/components/admin/Breadcrumb'
import { adminRoutes } from '@/routes/admin/routes'
import EkipList from '@/components/admin/ekibimiz/ekip-list'
function Ekibimiz() {
  const breadcrumb = [
    {
      title: "Anasayfa",
      link: adminRoutes.dashboard
    },
    {
      title: "Ekibimiz",
      link: adminRoutes.ekibimiz
    }
  ]
  return (

    <div>
      <Breadcrumb data={breadcrumb} />

      <div className="custContainer">
          <PageTitle title="Ekip Yönetimi" />
          <EkipList />
      </div>
    </div>
  )
}

export default Ekibimiz
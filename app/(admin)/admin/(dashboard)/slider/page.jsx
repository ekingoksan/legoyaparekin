'use server'
import React from 'react'
import SliderList from '@/components/admin/slider/slider-list'
import { PageTitle } from '@/components/admin/PageTitle'
import Breadcrumb from '@/components/admin/Breadcrumb'
import { adminRoutes } from '@/routes/admin/routes'
function Slider() {
  const breadcrumb = [
    {
      title: "Anasayfa",
      link: adminRoutes.dashboard
    },
    {
      title: "Slider",
      link: adminRoutes.slider
    }
  ]
  return (

    <div>
      <Breadcrumb data={breadcrumb} />

      <div className="custContainer">
          <PageTitle title="Slider Yönetimi" />
          <SliderList />
      </div>
    </div>
  )
}

export default Slider
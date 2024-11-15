'use server'
import React from 'react'
import SliderList from '@/components/admin/slider/slider-list'
import { PageTitle } from '@/components/admin/PageTitle'
import Breadcrumb from '@/components/admin/Breadcrumb'
import { adminRoutes } from '@/routes/admin/routes'
import BizKimiz from '@/components/admin/biz-kimiz/biz-kimiz'
function BizKimizPage() {
  const breadcrumb = [
    {
      title: "Anasayfa",
      link: adminRoutes.dashboard
    },
    {
      title: "Biz Kimiz",
      link: adminRoutes.biz_kimiz
    }
  ]
  return (

    <div>
      <Breadcrumb data={breadcrumb} />

      <div className="custContainer">
          <PageTitle title="Biz Kimiz22" />
          <BizKimiz />
      </div>
    </div>
  )
}

export default BizKimizPage
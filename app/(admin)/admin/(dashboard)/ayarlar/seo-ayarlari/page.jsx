import Breadcrumb from "@/components/admin/Breadcrumb";
import { PageTitle } from "@/components/admin/PageTitle";
import SeoSettings from "@/components/admin/settings/SeoSettings";
import { adminRoutes } from "@/routes/admin/routes";

export default function Home() {
  const breadcrumb = [
    {
      title: "Anasayfa",
      link: adminRoutes.dashboard
    },
    {
      title: "Ayarlar",
      link: "#"
    },
    {
      title: "Seo Ayarları",
      link: adminRoutes.seoSettings
    }
  ]
  return (
    <div>
        <Breadcrumb data={breadcrumb} />
        <div className="custContainer">
          <PageTitle title="Seo Ayarları" />
          <SeoSettings />
        </div>
    </div>

  );
}

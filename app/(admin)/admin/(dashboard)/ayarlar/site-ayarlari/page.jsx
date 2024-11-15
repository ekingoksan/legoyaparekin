import Breadcrumb from "@/components/admin/Breadcrumb";
import { PageTitle } from "@/components/admin/PageTitle";
import SiteSettings from "@/components/admin/settings/SiteSettings";
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
          title: "Site Ayarları",
          link: adminRoutes.siteSettings
        }
      ]
  return (
    <div>
        <Breadcrumb data={breadcrumb} />
        <div className="custContainer">
          <PageTitle title="Site Ayarları" />
          <SiteSettings />
        </div>
    </div>

  );
}

import Breadcrumb from "@/components/admin/Breadcrumb";
import { PageTitle } from "@/components/admin/PageTitle";
import FooterSettings from "@/components/admin/settings/FooterSettings";
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
      title: "Footer Ayarları",
      link: adminRoutes.footerSettings
    }
  ]
  return (
    <div>
        <Breadcrumb data={breadcrumb} />
        <div className="custContainer">
          <PageTitle title="Footer Ayarları" />
          <FooterSettings />
        </div>
    </div>

  );
}

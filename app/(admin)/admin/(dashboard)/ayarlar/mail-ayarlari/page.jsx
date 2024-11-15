import Breadcrumb from "@/components/admin/Breadcrumb";
import { PageTitle } from "@/components/admin/PageTitle";
import EmailSettings from "@/components/admin/settings/EmailSettings";
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
      title: "Mail Ayarları",
      link: adminRoutes.mailSettings
    }
  ]

  return (
    <div>
        <Breadcrumb data={breadcrumb} />
        <div className="custContainer">
          <PageTitle title="Mail Ayarları" />
          <EmailSettings />
        </div>
    </div>

  );
}

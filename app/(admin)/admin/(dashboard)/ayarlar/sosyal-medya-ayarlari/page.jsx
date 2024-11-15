import Breadcrumb from "@/components/admin/Breadcrumb";
import { PageTitle } from "@/components/admin/PageTitle";
import SocialMediaSettings from "@/components/admin/settings/SocialMediaSettings";
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
      title: "Sosyal Medya Ayarları",
      link: adminRoutes.socialSettings
    }
  ]
  return (
    <div>
        <Breadcrumb data={breadcrumb} />
        <div className="custContainer">
          <PageTitle title="Sosyal Medya Ayarları" />
          <SocialMediaSettings />
        </div>
    </div>

  );
}

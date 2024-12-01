import Breadcrumb from "@/components/admin/Breadcrumb";
import GenelDurumForm from "@/components/admin/genel-durumumuz";
import { PageTitle } from "@/components/admin/PageTitle";
import { adminRoutes } from "@/routes/admin/routes";

export default function Home() {
  const breadcrumb = [
    {
      title: "Anasayfa",
      link: adminRoutes.dashboard
    },
    {
      title: "Genel Durumumuz",
      link: adminRoutes.genel_durumumuz
    }
  ]
  return (
    <div>
        <Breadcrumb data={breadcrumb} />
        <div className="custContainer">
          <PageTitle title="Genel Durumumuz" />
          <GenelDurumForm />
        </div>
    </div>

  );
}

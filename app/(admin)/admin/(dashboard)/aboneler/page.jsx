import { getBlogList } from "@/actions/admin/blog/get/getBlogList";
import AbonelerList from "@/components/admin/aboneler/abone-list";
import BlogList from "@/components/admin/blog/BlogList";
import Breadcrumb from "@/components/admin/Breadcrumb";
import { PageTitle } from "@/components/admin/PageTitle";
import { adminRoutes } from "@/routes/admin/routes";

export default async function Home() {
  const breadcrumb = [
    {
      title: "Anasayfa",
      link: adminRoutes.dashboard
    },
    {
      title: "Aboneler",
      link: adminRoutes.aboneler
    }
  ]



  return (
    <div>
        <Breadcrumb data={breadcrumb} />
        <div className="custContainer">
          <PageTitle title="Aboneler" />
          <AbonelerList />
        </div>
    </div>

  );
}

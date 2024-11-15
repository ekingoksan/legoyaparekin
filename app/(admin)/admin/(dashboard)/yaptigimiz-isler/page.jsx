import Breadcrumb from "@/components/admin/Breadcrumb";
import { PageTitle } from "@/components/admin/PageTitle";
import PortflioList from "@/components/admin/portfolio/PortfolioList";
import { adminRoutes } from "@/routes/admin/routes";

export default async function Home() {
  const breadcrumb = [
    {
      title: "Anasayfa",
      link: adminRoutes.dashboard
    },
    {
      title: "Yaptığımız İşler",
      link: adminRoutes.portfolio
    }
  ]



  return (
    <div>
        <Breadcrumb data={breadcrumb} />
        <div className="custContainer">
          <PageTitle title="Yaptığımız İşler" />
          <PortflioList />
        </div>
    </div>

  );
}

import Breadcrumb from "@/components/admin/Breadcrumb";
import ContactList from "@/components/admin/contact/ContactList";
import { PageTitle } from "@/components/admin/PageTitle";
import { adminRoutes } from "@/routes/admin/routes";

export default async function Home() {
  const breadcrumb = [
    {
      title: "Anasayfa",
      link: adminRoutes.dashboard
    },
    {
      title: "Gelen Mesajlar",
      link: adminRoutes.contact
    }
  ]



  return (
    <div>
        <Breadcrumb data={breadcrumb} />
        <div className="custContainer">
          <PageTitle title="Gelen Mesajlar" />
          <ContactList />
        </div>
    </div>

  );
}

import { getBlogList } from "@/actions/admin/blog/get/getBlogList";
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
      title: "Blog",
      link: adminRoutes.blog
    }
  ]



  return (
    <div>
        <Breadcrumb data={breadcrumb} />
        <div className="custContainer">
          <PageTitle title="Blog" />
          <BlogList />
        </div>
    </div>

  );
}

import Breadcrumb from "@/components/admin/Breadcrumb";
import ChangeImage from "@/components/admin/customer-review/ChangeImage";
import ReviewList from "@/components/admin/customer-review/ReviewList";
import { PageTitle } from "@/components/admin/PageTitle";
import { adminRoutes } from "@/routes/admin/routes";

export default async function CustomerReview() {
  const breadcrumb = [
    {
      title: "Anasayfa",
      link: adminRoutes.dashboard
    },
    {
      title: "Müşteri Yorumları",
      link: adminRoutes.customer_review
    }
  ]



  return (
    <div>
        <Breadcrumb data={breadcrumb} />
        <div className="custContainer">
          <PageTitle title="Müşteri Yorumları" />
          <div className="flex flex-col gap-3">
            <ChangeImage />
            <div className="h-[1px] w-full bg-gray-300" />
            <ReviewList />
          </div>
        </div>
    </div>

  );
}

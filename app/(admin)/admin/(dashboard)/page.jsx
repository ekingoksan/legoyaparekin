import Breadcrumb from "@/components/admin/Breadcrumb";

export default function Home() {
  const breadcrumb = [
    {
      title: "Anasayfa",
      link: "/"
    }
  ]
  return (
    <div>
        <Breadcrumb data={breadcrumb} />
        <div className="custContainer">
        </div>
    </div>

  );
}

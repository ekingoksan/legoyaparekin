// CUSTOM DATA
import { factList4 } from "data/facts";
import CountUp from "../../reuseable/CountUp";
import Check from "@/icons/lineal/Check";
import User from "@/icons/lineal/User";
import BriefcaseTwo from "@/icons/lineal/BriefcaseTwo";
import AwardTwo from "@/icons/lineal/AwardTwo";

interface Facts5Props {
  data: {
    id: number;
    created_at: Date | null;
    updated_at: Date | null;
    completed_projects: number;
    satisfied_customers: number;
    years_of_experience: number;
    customer_retention: number;
  } | null
}

export default function Facts5({ data }: Facts5Props) {
  return (
    <section className="wrapper bg-soft-primary">
      <div className="container py-14 py-md-16">
        <div className="row mb-10">
          <div className="col-xl-10 mx-auto">
            <div className="row align-items-center counter-wrapper gy-6 text-center">

              <div className="col-md-3">
                <div className="flex justify-center items-center">
                  <Check className="icon-svg-lg text-primary mb-3" />
                </div>
                <h3 className="counter">
                  <CountUp end={data?.completed_projects || 0} />
                </h3>
                <p>Tamamlanan Projeler</p>
              </div>

              <div className="col-md-3">
                <div className="flex justify-center items-center">
                  <User className="icon-svg-lg text-primary mb-3" />
                </div>
                <h3 className="counter">
                  <CountUp end={data?.satisfied_customers || 0} />
                </h3>
                <p>Memnun Müşteriler</p>
              </div>

              <div className="col-md-3">
                <div className="flex justify-center items-center">
                  <AwardTwo className="icon-svg-lg text-primary mb-3" />
                </div>
                <h3 className="counter">
                  <CountUp end={data?.years_of_experience || 0} />
                </h3>
                <p>Deneyim</p>
              </div>

              <div className="col-md-3">
                <div className="flex justify-center items-center">
                <BriefcaseTwo className="icon-svg-lg text-primary mb-3" />
                </div>
                <h3 className="counter">
                  <CountUp end={data?.customer_retention || 0} />
                </h3>
                <p>Çalışan Sayısı</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// CUSTOM DATA
import Carousel from "../../reuseable/Carousel";
import { TestimonialCard2 } from "../../reuseable/testimonial-cards";

interface Testimonial5Props {
  image: string;
  list: {
    id: number;
    description: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    name_surname: string | null;
    job_title: string | null;
}[]
}

export default function Testimonial5({ image, list }: Testimonial5Props) {
  return (
    <section className="wrapper bg-soft-primary">
      <div className="container pt-16 pb-14 pb-md-0">
        <div className="row gx-lg-8 gx-xl-0 align-items-center">
          <div className="col-md-5 col-lg-5 col-xl-4 offset-xl-1 d-none d-md-flex position-relative align-self-end">
            <div
              className="shape rounded-circle bg-pale-primary rellax w-21 h-21 d-md-none d-lg-block"
              style={{ top: "7rem", left: "1rem" }}
            />

            <figure>
              <img src={`/images/site/${image}`} srcSet={`/images/site/${image}`} alt="" />
            </figure>
          </div>

          <div className="col-md-7 col-lg-6 col-xl-6 col-xxl-5 offset-xl-1">
            <div className="swiper-container dots-start dots-closer mt-md-10 mb-md-15">
              <Carousel grabCursor slidesPerView={1} navigation={false}>
                {list.map((item, i) => (
                  <TestimonialCard2
                    {...item}
                    key={i}
                  />
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

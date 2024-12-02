import NextLink from "@/components/web/reuseable/links/NextLink";
import LightBox from "../../LightBox";
import Carousel from "../../reuseable/Carousel";

interface SliderProps {
  data: {
    id: number;
    title: string | null;
    image: string | null;
    description: string | null;
    link: string | null;
    created_at: Date | null;
    updated_at: Date | null;
  }[] | null;
}

export default function Hero15({ data }: SliderProps) {
  return (
    <div className="wrapper bg-dark">
      {/* USED FOR IMAGE LIGHTBOX */}
      <LightBox />

      <div className="swiper-container swiper-hero dots-over">
        <Carousel slidesPerView={1} autoplay={{ delay: 7000, disableOnInteraction: false }}>
          {data?.map((item, index) => (
            <div
              key={`slider_${index}`}
              className="swiper-slide bg-overlay bg-overlay-400 bg-dark bg-image"
              style={{
                backgroundImage: `url(/images/site/${item.image})`,
              }}
            >
              <div className="container h-100">
                <div className="row h-100">
                  <div className="col-md-10 offset-md-1 col-lg-7 offset-lg-0 col-xl-6 col-xxl-5 text-center text-lg-start justify-content-center align-self-center align-items-start">
                    {item.title && (
                      <h2 className="display-1 fs-56 mb-4 text-white animate__animated animate__slideInDown animate__delay-1s">
                      {item.title}
                    </h2>
                  )}

                    {
                      item.description && (
                        <p className="lead fs-23 lh-sm mb-7 text-white animate__animated animate__slideInRight animate__delay-2s">
                        {item.description}
                      </p>
                      )
                    }

                    {
                      item.link && (
                          <div className="animate__animated animate__slideInUp animate__delay-3s">
                          <NextLink
                            title="Sayfaya Git"
                            href={item.link}
                            className="btn btn-lg btn-outline-white rounded-pill"
                          />
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          )) || []}
        </Carousel>
      </div>
    </div>
  );
}
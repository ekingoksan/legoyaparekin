import Team from "icons/lineal/Team";
// CUSTOM DATA
import Carousel from "../../reuseable/Carousel";
import { TeamCard1 } from "../../reuseable/team-cards";

interface Team3Props {
  myTeam: {
    id: number;
    name_surname: string | null;
    job_title: string | null;
    image: string | null;
    twitter: string | null;
    instagram: string | null;
    linkedin: string | null;
    description: string | null;
    created_at: Date | null;
    updated_at: Date | null;
  }[] | null;
}

export default function Team3({ myTeam }: Team3Props) {
  const carouselBreakpoints = {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 },
    1200: { slidesPerView: 4 },
  };

  return (
    <section className="wrapper bg-light">
      <div className="container py-14 py-md-8">
        <div className="row mb-3">
          <div className="col-md-10 col-xl-9 col-xxl-7 mx-auto text-center">
            <div className="flex justify-center items-center">
              <Team className="icon-svg-md mb-4" />
            </div>
            <h2 className="display-4 mb-3 px-lg-14">Ekibimiz</h2>
          </div>
        </div>

        <div className="position-relative">
          <div
            className="shape rounded-circle bg-soft-yellow rellax w-16 h-16"
            style={{ bottom: "0.5rem", right: "-1.7rem" }}
          />

          <div
            className="shape rounded-circle bg-line red rellax w-16 h-16"
            style={{ top: "0.5rem", left: "-1.7rem" }}
          />

          <div className="swiper-container dots-closer mb-6">
            {myTeam && myTeam.length > 0 ? (
              <Carousel grabCursor spaceBetween={0} navigation={false} breakpoints={carouselBreakpoints}>
                {myTeam.map((item) => (
                  <div className="item-inner" key={item.id}>
                    <TeamCard1 {...item} />
                  </div>
                ))}
              </Carousel>
            ) : (
              <p className="text-center">Ekibimiz hakkında bilgiler yakında eklenecektir.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
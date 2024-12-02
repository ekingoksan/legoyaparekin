import TeleMarketer from "icons/lineal/TeleMarketer";
import IconBox from "../../reuseable/IconBox";

interface Footer9Props {
  address: string;
  email: string;
  phone: string;
}

export default function Contact7({ address, email, phone }: Footer9Props) {
  return (
    <section className="wrapper bg-light angled upper-end lower-end">
      <div className="container pt-18 pb-14 pt-md-19 pb-md-16">
        <div className="row gx-md-8 gx-xl-12 gy-10 align-items-center">
          <div className="col-md-8 col-lg-6 offset-lg-0 col-xl-5 offset-xl-1 position-relative">
            <div className="shape bg-dot primary rellax w-17 h-21" style={{ top: "-2rem", left: "-1.4rem" }} />

            <figure className="rounded">
              <img src="/img/photos/about4.jpg" srcSet="/img/photos/about4@2x.jpg 2x" alt="" />
            </figure>
          </div>

          <div className="col-lg-6">
            <TeleMarketer className="icon-svg-md mb-4" />

            <h2 className="display-4 mb-8">Bizimle iletişime geçin.</h2>
            <div className="d-flex flex-row">
              <div>
                <IconBox className="icon text-primary fs-28 me-6 mt-n1" icon="uil-location-pin-alt" />
              </div>

              <div>
                <h5 className="mb-1">Adres</h5>
                <address>
                  {address}
                </address>
              </div>
            </div>

            <div className="d-flex flex-row">
              <div>
                <IconBox className="icon text-primary fs-28 me-6 mt-n1" icon="uil-phone-volume" />
              </div>

              <div>
                <h5 className="mb-1">Telefon</h5>
                <p>{phone}</p>
              </div>
            </div>

            <div className="d-flex flex-row">
              <div>
                <IconBox className="icon text-primary fs-28 me-6 mt-n1" icon="uil-envelope" />
              </div>

              <div>
                <h5 className="mb-1">E-mail</h5>
                <p className="mb-0">
                  <a href={`mailto:${email}`} className="link-body">
                    {email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

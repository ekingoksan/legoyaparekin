// GLOBAL CUSTOM COMPONENTS
import NextLink from "@/components/web/reuseable/links/NextLink";
import SocialLinks from "@/components/web/reuseable/SocialLinks";
// CUSTOM DATA
import footerNav, { helps } from "data/footer";

interface Footer9Props {
    logo: string;
    address: string;
    email: string;
    phone: string;
  socialMedia: any;
  footer:any
}

export default function Footer9({logo, address, email, phone, socialMedia, footer}: Footer9Props) {

  return (
    <footer className="bg-dark text-inverse">
      <div className="container py-13 py-md-15">
        <div className="row gy-6 gy-lg-0">
          <div className="col-lg-4">
            <div className="widget">
              <img width={200} className="mb-4" src={`/images/site/${footer?.logo}`} srcSet="" alt={`/images/site/${footer?.logo}`} />
              <p className="mb-4">
                {footer?.footer_text}
              </p>
              <p className="mb-4">
                © 2024 Lego Yapar. <br className="d-none d-lg-block" />
                Tüm hakları saklıdır.
              </p>

              <SocialLinks socialMedia={socialMedia} className="nav social social-white" />
            </div>
          </div>

          <div className="col-md-hidden col-lg-1 offset-lg-2">
            <div className="widget">
              <ul className="list-unstyled  mb-0">
                
              </ul>
            </div>
          </div>

          <div className="col-md-6 col-lg-2">
            <div className="widget">
              <h4 className="widget-title text-white mb-3">Sayfalar</h4>
              <ul className="list-unstyled  mb-0">
                  <li>
                    <NextLink title={"Anasayfa"} href={"/"} />
                  </li>
                  <li>
                    <NextLink title={"Biz Kimiz"} href={"/biz-kimiz"} />
                  </li>
                  <li>
                    <NextLink title={"Neler Yapıyoruz"} href={"/neler-yapiyoruz"} />
                  </li>
                  <li>
                    <NextLink title={"Referanslar"} href={"/referanslar"} />
                  </li>
                  <li>
                    <NextLink title={"Blog"} href={"/blog"} />
                  </li>
                  <li>
                    <NextLink title={"İletişim"} href={"/iletisim"} />
                  </li>
              </ul>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="widget">
              <h4 className="widget-title mb-3 text-white">Bize Ulaşın</h4>
              <address>{address}</address>
              <NextLink title={email} href={`mailto:${email}`} />
              <br /> {phone}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

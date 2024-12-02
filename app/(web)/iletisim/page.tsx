import { Fragment } from "react";
// GLOBAL CUSTOM COMPONENTS
import NavbarOne from "@/components/web/blocks/navbar/navbar-1";
import { Footer9 } from "@/components/web/blocks/footer";
import { getSiteSettings } from "@/actions/web/site_settings";
import { getSocialMedia } from "@/actions/web/getSocialMedias";
import { getFooterSettings } from "@/actions/web/footer_settings";
import { Process7 } from "@/components/web/blocks/process";
import { getHowItWorks } from "@/actions/web/how_it_works";
import { getHowItWorksSkills } from "@/actions/web/how_it_works_skills";
import ContactForm from "@/components/web/contactForm";


// interface DenemeProps {
//   setDeneme: Dispatch<
//     SetStateAction<{
//       id: string;
//       name: string;
//     } | null>
//   >;
//   deneme: {
//     id: string;
//     name: string;
// } | null
// }


export default async function Page() {
    // const { data: sliderData, error: sliderError } = await store.dispatch(
    //   slider_api.endpoints.getSlider.initiate()
    // );

    const siteSettings = await getSiteSettings();
    const socialMedia = await getSocialMedia();
    const footerSettings = await getFooterSettings();

    return (
        <Fragment>

            <header className="wrapper bg-soft-primary">
                <NavbarOne
                    isMain={false}
                    logo={siteSettings.data?.logo || ""}
                    email={siteSettings.data?.email || ""}
                    phone={siteSettings.data?.phone || ""}
                    socialMedia={socialMedia.data || null}
                    info
                    search
                    stickyBox={false}
                    logoAlt="logo-light"
                    navClassName="navbar navbar-expand-lg center-nav transparent position-absolute navbar-dark caret-none"
                />
            </header>

            {/* ========== main content ========== */}
            <main className="content-wrapper">
                <section className="wrapper bg-light angled lower-end">
                    <div className="container py-14 py-md-16">
                        {/* ========== contact info section ========== */}
                        <div className="row mb-14 mb-md-16">
                            <div className="col-xl-10 mx-auto">
                                <div className="card">
                                    <div className="row gx-0">
                                        <div className="col-lg-6 align-self-stretch">
                                            <div className="map map-full rounded-top rounded-lg-start">
                                                <div className="h-full" dangerouslySetInnerHTML={siteSettings.data?.google_map ? { __html: siteSettings.data.google_map } : undefined} />
                                            </div>
                                        </div>

                                        <div className="col-lg-6">
                                            <div className="p-10 p-md-11 p-lg-14">
                                                <div className="d-flex flex-row">
                                                    <div>
                                                        <div className="icon text-primary fs-28 me-4 mt-n1">
                                                            <i className="uil uil-location-pin-alt" />
                                                        </div>
                                                    </div>
                                                    <div className="align-self-start justify-content-start">
                                                        <h5 className="mb-1">Adres</h5>
                                                        <address>
                                                            {siteSettings.data?.address || ""}
                                                        </address>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row">
                                                    <div>
                                                        <div className="icon text-primary fs-28 me-4 mt-n1">
                                                            <i className="uil uil-phone-volume" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h5 className="mb-1">Telefon</h5>
                                                        <p>
                                                            <a href={`tel:${siteSettings?.data?.phone || ""}`} className="link-body">
                                                                {siteSettings.data?.phone || ""}
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row">
                                                    <div>
                                                        <div className="icon text-primary fs-28 me-4 mt-n1">
                                                            <i className="uil uil-envelope" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h5 className="mb-1">E-mail</h5>
                                                        <p className="mb-0">
                                                            <a href={`mailto:${siteSettings?.data?.email}`} className="link-body">
                                                                {siteSettings?.data?.email}
                                                            </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ========== contact form section ========== */}
                        <div className="row">
                            <div className="col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
                                <h2 className="display-4 mb-3 text-center">Bize Yazın</h2>
                                <p className="lead text-center mb-10">
                                    Fiyat teklifi almak, randevu almak veya başka bir konuda bize ulaşmak için aşağıdaki formu doldurabilirsiniz.
                                </p>

                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* ========== footer section ========== */}
            <Footer9 logo={siteSettings.data?.logo || ""} email={siteSettings.data?.email || ""} address={siteSettings.data?.address || ""} phone={siteSettings.data?.phone || ""} socialMedia={socialMedia} footer={footerSettings?.data} />
        </Fragment>
    );
}

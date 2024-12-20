import { Dispatch, Fragment, SetStateAction, useState } from "react";
// GLOBAL CUSTOM COMPONENTS
import NavbarOne from "@/components/web/blocks/navbar/navbar-1";
import { Hero15 } from "@/components/web/blocks/hero";
import { About6 } from "@/components/web/blocks/about";
import { Process7 } from "@/components/web/blocks/process";
import { Testimonial5 } from "@/components/web/blocks/testimonial";
import { Team3 } from "@/components/web/blocks/team";
import { Facts5 } from "@/components/web/blocks/facts";
import { Contact7 } from "@/components/web/blocks/contact";
import { CTA5 } from "@/components/web/blocks/call-to-action";
import { Footer9 } from "@/components/web/blocks/footer";
import { getSlider } from "@/actions/web/slider";
import { getWhoAreWe } from "@/actions/web/who_are_we";
import { getOurSkills } from "@/actions/web/our_skills";
import { getHowItWorks } from "@/actions/web/how_it_works";
import { getHowItWorksSkills } from "@/actions/web/how_it_works_skills";
import { getCustomerReviews } from "@/actions/web/customer_reviews";
import { getCustomerReviewsImage } from "@/actions/web/customer_reviews_image";
import { getTeams } from "@/actions/web/teams";
import { getGeneralStatus } from "@/actions/web/generalStatus";
import { getSiteSettings } from "@/actions/web/site_settings";
import { getSocialMedia } from "@/actions/web/getSocialMedias";
import { getFooterSettings } from "@/actions/web/footer_settings";

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
  const sliders = await getSlider()
  const whoAreWe = await getWhoAreWe()
  const ourSkills = await getOurSkills()
  const howItWorks = await getHowItWorks()
  const howItWorksSkills = await getHowItWorksSkills()
  const customerReviews = await getCustomerReviews()
  const customerReviewsImage = await getCustomerReviewsImage()
  const myTeam = await getTeams()
  const generalStatus = await getGeneralStatus();
  const socialMedia = await getSocialMedia();
  const footerSettings = await getFooterSettings();

  return (
    <Fragment>

      <header className="wrapper bg-soft-primary">
        <NavbarOne
          isMain={true}
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
        {/* ========== hero sections ========== */}
        <Hero15 data={sliders.data} />

        <section className="wrapper bg-light angled lower-end">
          <div className="container py-14 py-md-16">
            {/* ========== about section ========== */}
              <About6 about={whoAreWe?.data || null} ourSkills={ourSkills?.data || []} />
            {/* ========== process section ========== */}
            <Process7 howItWorks={howItWorks.data || null} howItWorksSkills={howItWorksSkills.data || []} isMainPage={true} />
          </div>
        </section>

        {/* ========== testimonial section ========== */}
        <Testimonial5 list={customerReviews.data || []} image={customerReviewsImage.data?.image || ""} />

        {/* ========== team section ========== */}
        <Team3 myTeam={myTeam.data} />

        {/* ========== facts section ========== */}
        <Facts5 data={generalStatus.data || null} />

        {/* ========== contact section ========== */}
        <Contact7  email={siteSettings.data?.email || ""} address={siteSettings.data?.address || ""} phone={siteSettings.data?.phone || ""} />

        {/* ========== call to action section ========== */}
        <CTA5 />
      </main>

      {/* ========== footer section ========== */}
      <Footer9 logo={siteSettings.data?.logo || ""} email={siteSettings.data?.email || ""} address={siteSettings.data?.address || ""} phone={siteSettings.data?.phone || ""} socialMedia={socialMedia} footer={footerSettings?.data} />
    </Fragment>
  );
}

import { Fragment} from "react";
// GLOBAL CUSTOM COMPONENTS
import NavbarOne from "@/components/web/blocks/navbar/navbar-1";
import { Footer9 } from "@/components/web/blocks/footer";
import { getSiteSettings } from "@/actions/web/site_settings";
import { getSocialMedia } from "@/actions/web/getSocialMedias";
import { getFooterSettings } from "@/actions/web/footer_settings";
import { Process7 } from "@/components/web/blocks/process";
import { getHowItWorks } from "@/actions/web/how_it_works";
import { getHowItWorksSkills } from "@/actions/web/how_it_works_skills";


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
  const howItWorks = await getHowItWorks()
  const howItWorksSkills = await getHowItWorksSkills()

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
            <Process7 howItWorks={howItWorks.data || null} howItWorksSkills={howItWorksSkills.data || []} isMainPage={false} />
          </div>
        </section>
      </main>

      {/* ========== footer section ========== */}
      <Footer9 logo={siteSettings.data?.logo || ""} email={siteSettings.data?.email || ""} address={siteSettings.data?.address || ""} phone={siteSettings.data?.phone || ""} socialMedia={socialMedia} footer={footerSettings?.data} />
    </Fragment>
  );
}

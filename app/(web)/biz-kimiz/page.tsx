import { Fragment } from "react";
// GLOBAL CUSTOM COMPONENTS
import NavbarOne from "@/components/web/blocks/navbar/navbar-1";
import { About6 } from "@/components/web/blocks/about";
import { Team3 } from "@/components/web/blocks/team";
import { Footer9 } from "@/components/web/blocks/footer";
import { getWhoAreWe } from "@/actions/web/who_are_we";
import { getOurSkills } from "@/actions/web/our_skills";
import { getTeams } from "@/actions/web/teams";
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
  const whoAreWe = await getWhoAreWe()
  const ourSkills = await getOurSkills()
  const socialMedia = await getSocialMedia();
  const footerSettings = await getFooterSettings();
  const myTeam = await getTeams()


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
            {/* ========== about section ========== */}
              <About6 about={whoAreWe?.data || null} ourSkills={ourSkills?.data || []} />
            
            {/* ========== team section ========== */}
              <Team3 myTeam={myTeam.data} />

          </div>
        </section>
      </main>

      {/* ========== footer section ========== */}
      <Footer9 logo={siteSettings.data?.logo || ""} email={siteSettings.data?.email || ""} address={siteSettings.data?.address || ""} phone={siteSettings.data?.phone || ""} socialMedia={socialMedia} footer={footerSettings?.data} />
    </Fragment>
  );
}

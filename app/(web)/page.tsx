import { Fragment } from "react";
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

export default function Demo15() {
  return (
    <Fragment>
      {/* ========== header ========== */}
      <header className="wrapper bg-soft-primary">
        <NavbarOne
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
        <Hero15 />

        <section className="wrapper bg-light angled lower-end">
          <div className="container py-14 py-md-16">
            {/* ========== about section ========== */}
            <About6 />

            {/* ========== process section ========== */}
            <Process7 />
          </div>
        </section>

        {/* ========== testimonial section ========== */}
        <Testimonial5 />

        {/* ========== team section ========== */}
        <Team3 />

        {/* ========== facts section ========== */}
        <Facts5 />

        {/* ========== contact section ========== */}
        <Contact7 />

        {/* ========== call to action section ========== */}
        <CTA5 />
      </main>

      {/* ========== footer section ========== */}
      <Footer9 />
    </Fragment>
  );
}

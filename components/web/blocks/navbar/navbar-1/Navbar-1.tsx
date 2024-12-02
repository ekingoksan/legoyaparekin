"use client";

import { Fragment, ReactElement, useRef } from "react";
// -------- CUSTOM HOOKS -------- //
import useSticky from "hooks/useSticky";
import useNestedDropdown from "hooks/useNestedDropdown";
// -------- CUSTOM COMPONENTS -------- //
import NextLink from "@/components/web/reuseable/links/NextLink";
// LOCAL CUSTOM COMPONENTS
import Info from "../components/Info";
import Search from "../components/search";
import Signin from "../components/signin";
import Signup from "../components/signup";
import MiniCart from "../components/mini-cart";
import HeaderRight from "../components/header-right";
import FancyHeader from "../components/fancy-header";
import SocialLinks from "@/components/web/reuseable/SocialLinks";

// ===================================================================
interface NavbarProps {
  isMain?: boolean;
  info?: boolean;
  cart?: boolean;
  fancy?: boolean;
  logoAlt?: string;
  search?: boolean;
  social?: boolean;
  language?: boolean;
  stickyBox?: boolean;
  navClassName?: string;
  email?: string;
  phone?: string;
  button?: ReactElement;
  navOtherClass?: string;
  logo: string;
  socialMedia: any;
}
// ===================================================================

export default function NavbarOne({
  isMain = true,
  fancy,
  cart = false,
  info = false,
  search = false,
  stickyBox = true,
  logo = "",
  email,
  phone,
  socialMedia,
  navClassName = "navbar navbar-expand-lg center-nav transparent navbar-light"
}: NavbarProps) {
  useNestedDropdown();
  const sticky = useSticky(350);
  const navbarRef = useRef<HTMLElement | null>(null);

  // dynamically render the logo

  // dynamically added navbar className
  const fixedClassName = "navbar navbar-expand-lg center-nav transparent navbar-light navbar-clone fixed navbar-stick";

  // all main header contents
  const headerContent = (
    <Fragment>
      <div className="navbar-brand w-[250px]">
        <NextLink href="/" title={<img alt="logo" src={`/images/site/${logo}.png`} srcSet={`/images/site/${logo}`} />} />
      </div>

      <div id="offcanvas-nav" data-bs-scroll="true" className="navbar-collapse offcanvas offcanvas-nav offcanvas-start">
        <div className="offcanvas-header d-lg-none">
          <h3 className="text-white fs-30 mb-0">Sandbox</h3>
          <button
            type="button"
            aria-label="Close"
            data-bs-dismiss="offcanvas"
            className="btn-close btn-close-white ms-auto"
          />
        </div>

        <div className="offcanvas-body ms-lg-auto d-flex flex-column h-100">
          <ul className="navbar-nav text-black">
            {/* ===================== demos nav item ===================== */}
            <li className="text-black">
              <NextLink title="Anasayfa" className={`nav-link ${isMain == false && "!text-black"}`} href="/" />
            </li>
            <li>
              <NextLink title="Biz Kimiz" className={`nav-link ${isMain == false && "!text-black"}`} href="/biz-kimiz" />
            </li>
            <li>
              <NextLink title="Neler Yapıyoruz" className={`nav-link ${isMain == false && "!text-black"}`} href="/neler-yapiyoruz" />
            </li>
            <li>
              <NextLink title="Referanslar" className={`nav-link ${isMain == false && "!text-black"}`} href="/referanslar" />
            </li>
            <li>
              <NextLink title="Blog" className={`nav-link ${isMain == false && "!text-black"}`} href="/blog" />
            </li>
            <li>
              <NextLink title="İletişim" className={`nav-link ${isMain == false && "!text-black"}`} href="/iletisim" />
            </li>
          </ul>

          {/* ============= show contact info in the small device sidebar ============= */}
          <div className="offcanvas-footer d-lg-none">
            <div>
              <NextLink title={email} className="link-inverse" href={`mailto:${email}`} />
              <br />
              <NextLink href={`tel:${phone}`} title={phone} />
              <br />
              <SocialLinks socialMedia={socialMedia} />
            </div>
          </div>
        </div>
      </div>
      {/* ============= right side header content ============= */}
      <HeaderRight />
    </Fragment>
  );

  return (
    <Fragment>
      {stickyBox ? <div style={{ paddingTop: sticky ? navbarRef.current?.clientHeight : 0 }} /> : null}

      <nav ref={navbarRef} className={sticky ? fixedClassName : navClassName}>
        {fancy ? (
          <FancyHeader>{headerContent}</FancyHeader>
        ) : (
          <div className="container flex-lg-row flex-nowrap align-items-center">{headerContent}</div>
        )}
      </nav>

      {/* ============= signin modal ============= */}
      <Signin />

      {/* ============= signup modal ============= */}
      <Signup />

      {/* ============= info sidebar ============= */}
      {info ? <Info /> : null}

      {/* ============= show search box ============= */}
      {search ? <Search /> : null}

      {/* ============= cart sidebar ============= */}
      {cart ? <MiniCart /> : null}
    </Fragment>
  );
}

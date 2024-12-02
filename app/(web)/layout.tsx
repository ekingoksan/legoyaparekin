import type { Metadata } from "next";

import ThemeProvider from "theme/ThemeProvider";



// ANIMATE CSS
import "animate.css";
// SWIPER CSS
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
// REACT VIDEO PLYR CSS
import "plyr-react/plyr.css";
// G-LIGHTBOX CSS
import "glightbox/dist/css/glightbox.css";
// SCROLL CUE CSS
import "plugins/scrollcue/scrollCue.css";
// BOOTSTRAP & CUSTOM CSS
import "assets/scss/style.scss";

import ScrollCue from "@/components/web/ScrollCue";
import PageProgress from "@/components/web/common/PageProgress";
import Progress from "@/components/web/Progress";
import { getSeoSettings } from "@/actions/web/getSeoSettings";


export async function generateMetadata(){
  // fetch data
  const seo = await getSeoSettings();
    console.log("SEO",seo)

  return {
    title: seo?.data?.site_title,
    keywords: seo?.data?.keywords,
    description: seo?.data?.description,
  }
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
      <div>
        <ThemeProvider>{children}</ThemeProvider>

        {/* USED FOR SCROLL ANIMATION */}
        <ScrollCue />

        {/* USED FOR PAGE SCROLL PROGRESS BAR */}
        <PageProgress />

        {/* USED FOR PROGRESS BAR ANIMATE */}
        <Progress />
      </div>
  );
}

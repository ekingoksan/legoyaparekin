import { Fragment } from "react";
import NextLink from "@/components/web/reuseable/links/NextLink";
// CUSTOM UTILS LIBRARY FUNCTIONS
import { slideInDownAnimate } from "utils/animation";

export default function GoogleAppBtn() {
  return (
    <div className="d-flex justify-content-center justify-content-lg-start" style={slideInDownAnimate("900ms")}>
      <span style={slideInDownAnimate("1200ms")}>
        <NextLink
          href="#"
          className="btn btn-primary btn-icon btn-icon-start rounded me-2"
          title={
            <Fragment>
              <i className="uil uil-apple" /> App Store
            </Fragment>
          }
        />
      </span>

      <span style={slideInDownAnimate("1500ms")}>
        <NextLink
          href="#"
          className="btn btn-green btn-icon btn-icon-start rounded"
          title={
            <Fragment>
              <i className="uil uil-google-play" /> Google Play
            </Fragment>
          }
        />
      </span>
    </div>
  );
}

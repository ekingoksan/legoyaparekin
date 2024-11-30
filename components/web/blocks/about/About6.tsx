import Megaphone from "icons/lineal/Megaphone";
// CUSTOM DATA
import { aboutList2 } from "data/about";
import { Tiles5 } from "../../elements/tiles";
import ListColumn from "../../reuseable/ListColumn";

export default function About6() {
  return (
    <div className="row gx-lg-8 gx-xl-12 gy-10 mb-14 mb-md-17 align-items-center">
      <div className="col-lg-6 position-relative order-lg-2">
        <Tiles5 />
      </div>

      <div className="col-lg-6">
        <Megaphone className="icon-svg-md mb-4" />

        <h2 className="display-4 mb-3">Who Are We?</h2>

        <p className="lead fs-lg">
          We are a digital and branding company that believes in the power of creative strategy and along with great
          design.
        </p>

        <p className="mb-6">
          Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras justo odio, dapibus
          ac facilisis in, egestas eget quam. Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
        </p>

        <ListColumn rowClass="gx-xl-8" list={aboutList2} />
      </div>
    </div>
  );
}
import Megaphone from "icons/lineal/Megaphone";
// CUSTOM DATA
import { Tiles5 } from "../../elements/tiles";
import ListColumn from "../../reuseable/ListColumn";

interface AboutProps {
  about: {
    id: number;
    title: string | null;
    description: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    image_1: string | null;
    image_2: string | null;
  } | null;
  ourSkills: {
    title: string | null;
    id: number;
    created_at: Date | null;
    updated_at: Date | null;
  }[] | null;
}

export default function About6({ about, ourSkills }: AboutProps) {

  const images = [about?.image_1, about?.image_2].filter((item): item is string => !!item);
  return (
    <div className="row gx-lg-8 gx-xl-12 gy-10 mb-14 mb-md-17 align-items-center">
      <div className="col-lg-6 position-relative order-lg-2">
        <Tiles5 images={images} />      
      </div>

      <div className="col-lg-6">
        <Megaphone className="icon-svg-md mb-4" />

        <h2 className="display-4 mb-3">{about?.title}</h2>

        {about?.description && (
          <div className="lead" dangerouslySetInnerHTML={{ __html: about.description }} />
        )}

        <ListColumn rowClass="gx-xl-8" list={ourSkills} />
      </div>
    </div>
  );
}

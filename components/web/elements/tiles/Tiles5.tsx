import { Fragment } from "react";

interface Tiles5Props {
  images: string[];
}

export default function Tiles5({ images }: Tiles5Props) {

  return (
    <Fragment>
      <div className="shape bg-dot primary rellax w-16 h-20" style={{ top: "3rem", left: "5.5rem" }} />
      <div className="overlap-grid overlap-grid-2">
        {images.map((item, i) => (
          <div className="item" key={item + i}>
            <figure className="rounded shadow">
              <img src={`/images/site/${item}`} srcSet={`/images/site/${item}`} alt={item} />
            </figure>
          </div>
        ))}
      </div>
    </Fragment>
  );
}

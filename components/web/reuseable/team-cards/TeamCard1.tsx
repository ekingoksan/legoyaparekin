import Image from "next/image";
import clsx from "clsx";

import IconLink from "../links/IconLink";

// ==========================================================
interface TeamCard1Props {
    id: number;
    name_surname: string | null;
    job_title: string | null;
    image: string | null;
    twitter: string | null;
    instagram: string | null;
    linkedin: string | null;
    description: string | null;
    created_at: Date | null;
    updated_at: Date | null;
}
// ==========================================================

export default function TeamCard1({
  id, name_surname, job_title, image, twitter, instagram, linkedin, description
}: TeamCard1Props) {
  return (
    <div className={clsx({ card: true })}>
      <div className="card-body">
        <div className="rounded-circle w-15 mb-4 overflow-hidden">
          <Image src={`/images/site/${image}`} width={300} height={300} alt="Team Member" className="w-100 h-auto" />
        </div>

        <h4 className="mb-1">{name_surname}</h4>
        <div className="meta mb-2">{job_title}</div>
        <p className="mb-2">{description}</p>

        <nav className="nav social mb-0">
          <IconLink href={`https://x.com/${twitter}`} icon={<i className="uil uil-twitter" />} />
          <IconLink href={`https://instagram.com/${instagram}`} icon={<i className="uil uil-instagram" />} />
          <IconLink href={`https://linkedin.com/${linkedin}`} icon={<i className="uil uil-linkedin" />} />
        </nav>
      </div>
    </div>
  );
}

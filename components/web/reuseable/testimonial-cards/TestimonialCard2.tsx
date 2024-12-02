import { HTMLAttributes } from "react";

// =================================================
interface TestimonialCard2Props {id: number;
  description: string | null;
  created_at: Date | null;
  updated_at: Date | null;
  name_surname: string | null;
  job_title: string | null;
}
// =================================================

export default function TestimonialCard2({
  name_surname,
  description,
  job_title
}: TestimonialCard2Props) {
  return (
    <blockquote className={"icon icon-top fs-lg text-center"}>
      <p>“{description}”</p>

      <div className={"blockquote-details justify-content-center text-center"}>
        <div className="info ps-0">
          <h5 className="mb-1">{name_surname}</h5>
          <p className="mb-0">{job_title}</p>
        </div>
      </div>
    </blockquote>
  );
}

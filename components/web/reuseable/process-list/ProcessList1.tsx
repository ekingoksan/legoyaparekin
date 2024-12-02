import clsx from "clsx";

// ==============================================================
interface ProcessList1Props {
    title: string | null;
    id: number;
    description: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    no: number;
    className: string;
}
// ==============================================================

export default function ProcessList1({ id, title, description , no, className}: ProcessList1Props) {
  return (
    <div
      className={clsx({
        card: true,
        [className]: Boolean(className),
      })}>
      <div className="card-body p-6">
        <div className="d-flex flex-row">
          <div>
            <span className="icon btn btn-circle btn-lg btn-soft-primary pe-none me-4">
              <span className="number">{++no}</span>
            </span>
          </div>

          <div>
            <h4 className="mb-1">{title}</h4>
            <p className="mb-0">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

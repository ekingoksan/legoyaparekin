
// ===========================================================
interface ListColumnProps {
  list: {
    title: string | null;
    id: number;
    created_at: Date | null;
    updated_at: Date | null;
  }[] | null;
  rowClass?: string;
  bulletColor?: string;
}
// ===========================================================

export default function ListColumn({ list, rowClass = "", bulletColor = "primary" }: ListColumnProps) {
  return (
    <div className={"row gy-3 " + rowClass}>
      {list?.map((item, i) => (
        <div key={i} className="col-xl-6 items-center flex">
          <ul className={`icon-list bullet-bg bullet-soft-${bulletColor} mb-0`}>
            <li>
              <i className="uil uil-check" /> {item.title}
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}

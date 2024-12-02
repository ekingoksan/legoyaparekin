import { Fragment } from "react";
// CUSTOM ICON COMPONENT
import List from "icons/lineal/List";
// GLOBAL CUSTOM COMPONENTS
import NextLink from "@/components/web/reuseable/links/NextLink";
// CUSTOM DATA
import { ProcessList1 } from "../../reuseable/process-list";

interface Process7Props {
  howItWorks: {
    id: number;
    mainTitle: string | null;
    title: string | null;
    description: string | null;
    created_at: Date | null;
    updated_at: Date | null;
  } | null;
  howItWorksSkills: {
    title: string | null;
    id: number;
    description: string | null;
    created_at: Date | null;
    updated_at: Date | null;
  }[];
  isMainPage: boolean;
}

export default function Process7({ howItWorks, howItWorksSkills, isMainPage }: Process7Props) {
  return (
    <Fragment>
      <div className="row mb-5">
        <div className="col-md-10 col-xl-8 col-xxl-7 mx-auto text-center">
         {
            isMainPage && (
              <div className="flex justify-center items-center">
                <List />
              </div>
            )
         }
          <h2 className="display-4 mb-4 px-lg-14">{howItWorks?.mainTitle}</h2>
        </div>
      </div>

      <div className={`row gx-lg-8 gx-xl-12 gy-10 ${isMainPage ? "align-items-center" : "align-items-start"}`}>
        <div className="col-lg-6 order-lg-2">
          {howItWorksSkills.map((item, index) => (
            <ProcessList1 {...item} no={index} className={index % 2 === 0 && index > 0 ? "ms-lg-6 mt-6" : index % 2 === 0 ? "ms-lg-6" : "ms-lg-13 mt-6"} key={item.id} />
          ))}
        </div>

        <div className="col-lg-6">
          <h2 className="display-6 mb-3">{howItWorks?.title}</h2>
          <div
            className="mb-5 lead"
            dangerouslySetInnerHTML={{
              __html: isMainPage
                ? (howItWorks?.description?.substring(0, 500) || '') + (howItWorks?.description && howItWorks.description.length > 500 ? '...' : '')
                : howItWorks?.description || '',
            }}
          />
          {
            isMainPage && (
              <NextLink title="Devamını Gör" href="#" className="btn btn-primary rounded-pill mb-0" />
            )
          }
        </div>
      </div>
    </Fragment>
  );
}

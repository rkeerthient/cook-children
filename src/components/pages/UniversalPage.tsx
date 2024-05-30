import * as React from "react";
import {
  DirectAnswer,
  ResultsCount,
  SpellCheck,
  StandardCard,
  StandardSection,
  UniversalResults,
} from "@yext/search-ui-react";
import {
  UniversalLimit,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import ProfessionalCard from "../cards/ProfessionalCard";
import ServicesCard from "../cards/ServicesCard";
import { useLayoutEffect, useState } from "react";
import FAQCard from "../cards/FAQCard";

const UniversalPage = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const searchActions = useSearchActions();
  const universalLimit: UniversalLimit = {
    faqs: 4,
    healthcare_facilities: 4,
    healthcare_professionals: 4,
    specialties: 4,
  };
  useLayoutEffect(() => {
    setIsLoaded(false);
    searchActions.setUniversal();
    searchActions.setUniversalLimit(universalLimit);
    searchActions.executeUniversalQuery().then((res) => setIsLoaded(true));
  }, []);

  const Grid4Section = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div>{header}</div>
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };
  const FlexSection = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div>Missing Card Component</div>;
    }
    return (
      <div>
        <div>{header}</div>
        <div className="flex flex-col gap-4">
          {results.map((r: any, index: number) => (
            <CardComponent key={index} result={r} />
          ))}
        </div>
      </div>
    );
  };
  const HiddenSection = ({ results, CardComponent, header }: any) => {
    if (!CardComponent) {
      return <div></div>;
    }
    return <div className="hidden"></div>;
  };

  return (
    <div className="max-w-7xl p-4 mx-auto">
      <>
        {!isLoaded ? (
          <div />
        ) : (
          <>
            <ResultsCount />
            <DirectAnswer />
            <UniversalResults
              verticalConfigMap={{
                faqs: {
                  label: "FAQs",
                  CardComponent: FAQCard,
                  SectionComponent: FlexSection,
                },
                healthcare_facilities: {
                  label: "Healthcare Facilities",
                  CardComponent: StandardCard,
                  SectionComponent: Grid4Section,
                },
                healthcare_professionals: {
                  label: "Healthcare Professionals",
                  CardComponent: ProfessionalCard,
                  SectionComponent: Grid4Section,
                },
                specialties: {
                  label: "Services",
                  CardComponent: ServicesCard,
                  SectionComponent: FlexSection,
                },
                links: {
                  label: "",
                  CardComponent: undefined,
                  SectionComponent: HiddenSection,
                },
              }}
            />
          </>
        )}
      </>
    </div>
  );
};

export default UniversalPage;

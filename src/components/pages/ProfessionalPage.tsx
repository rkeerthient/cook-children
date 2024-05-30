import {
  Facets,
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  Geolocation,
} from "@yext/search-ui-react";
import ProfessionalCard from "../cards/ProfessionalCard";
import { useSearchActions } from "@yext/search-headless-react";
import { useLayoutEffect, useState } from "react";

const ProfessionalPage = () => {
  const searchActions = useSearchActions();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useLayoutEffect(() => {
    setIsLoaded(false);
    searchActions.setVertical("healthcare_professionals");
    searchActions.executeVerticalQuery().then((res) => setIsLoaded(true));
  }, []);
  return (
    <>
      {isLoaded && (
        <div className="flex flex-row gap-2 mt-4 w-full px-14 ">
          <div className="w-1/5">
            <Facets
              customCssClasses={{ facetsContainer: "ml-8 mr-4 " }}
            ></Facets>
          </div>
          <div className="flex-grow w-4/5">
            <div className="flex flex-col items-baseline  ">
              <ResultsCount />
              <AppliedFilters />
            </div>
            <VerticalResults
              CardComponent={ProfessionalCard}
              customCssClasses={{
                verticalResultsContainer:
                  "grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8",
              }}
            />
            <Pagination />
            <Geolocation />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfessionalPage;

import { useSearchActions } from "@yext/search-headless-react";
import {
  Facets,
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  Geolocation,
} from "@yext/search-ui-react";
import { useLayoutEffect, useState } from "react";
import ServicesCard from "../cards/ServicesCard";

const ServicePage = () => {
  const searchActions = useSearchActions();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useLayoutEffect(() => {
    setIsLoaded(false);
    searchActions.setVertical("specialties");
    searchActions.executeVerticalQuery().then((res) => setIsLoaded(true));
  }, []);
  return (
    <>
      {isLoaded && (
        <div className="flex flex-row gap-2 mt-4 w-full px-14 centered-container">
          <div className="flex-grow ">
            <div className="flex flex-col items-baseline  ">
              <ResultsCount />
              <AppliedFilters />
            </div>
            <VerticalResults
              CardComponent={ServicesCard}
              customCssClasses={{
                verticalResultsContainer: "flex flex-col gap-4",
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

export default ServicePage;

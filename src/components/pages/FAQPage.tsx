import {
  Facets,
  ResultsCount,
  AppliedFilters,
  Pagination,
  VerticalResults,
  Geolocation,
} from "@yext/search-ui-react";
import FAQCard from "../cards/FAQCard";
import { useSearchActions } from "@yext/search-headless-react";
import { useLayoutEffect, useState } from "react";

const FAQPage = () => {
  const searchActions = useSearchActions();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useLayoutEffect(() => {
    setIsLoaded(false);
    searchActions.setVertical("faqs");
    searchActions.executeVerticalQuery().then((res) => setIsLoaded(true));
  }, []);
  return (
    <>
      {isLoaded && (
        <div className="flex flex-row gap-2 mt-4 w-full px-14 centered-container">
          <div className="flex-grow  ">
            <div className="flex flex-col items-baseline  ">
              <ResultsCount />
              <AppliedFilters />
            </div>
            <VerticalResults
              CardComponent={FAQCard}
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

export default FAQPage;

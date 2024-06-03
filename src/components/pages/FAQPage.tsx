import {
  AppliedFilters,
  Geolocation,
  Pagination,
  ResultsCount,
  VerticalResults,
} from "@yext/search-ui-react";
import FAQCard from "../cards/FAQCard";
import { useVerticalSearch } from "../useVerticalSearch";
import Loader from "../Loader";
export interface PageProps {
  verticalKey: string;
}
const FAQPage = ({ verticalKey }: PageProps) => {
  const { isLoaded } = useVerticalSearch(verticalKey) || false;

  return (
    <>
      {isLoaded ? (
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
      ) : (
        <Loader />
      )}
    </>
  );
};

export default FAQPage;

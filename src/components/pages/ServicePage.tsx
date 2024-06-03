import {
  AppliedFilters,
  Geolocation,
  Pagination,
  ResultsCount,
  VerticalResults,
} from "@yext/search-ui-react";
import ServicesCard from "../cards/ServicesCard";
import { useVerticalSearch } from "../useVerticalSearch";
import { PageProps } from "./FAQPage";
import Loader from "../Loader";

const ServicePage = ({ verticalKey }: PageProps) => {
  const { isLoaded } = useVerticalSearch(verticalKey) || false;
  return (
    <>
      {isLoaded ? (
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
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ServicePage;

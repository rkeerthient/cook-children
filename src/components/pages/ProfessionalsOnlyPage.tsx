import {
  AppliedFilters,
  Facets,
  Geolocation,
  Pagination,
  ResultsCount,
  SearchBar,
  VerticalResults,
} from "@yext/search-ui-react";
import ProfessionalCard from "../cards/ProfessionalCard";
import { useVerticalSearch } from "../useVerticalSearch";
import { PageProps } from "./FAQPage";
import Loader from "../Loader";
import { useTypingEffect } from "../useTypeEffect";

const ProfessionalsOnlyPage = ({ verticalKey }: PageProps) => {
  const { queryPrompts } = useTypingEffect(
    import.meta.env.YEXT_PUBLIC_API_KEY,
    import.meta.env.YEXT_PUBLIC_EXP_KEY
  );
  const { isLoaded } = useVerticalSearch(verticalKey) || false;
  return (
    <>
      <SearchBar
        customCssClasses={{ inputElement: "demo", searchBarContainer: "px-24" }}
      ></SearchBar>
      {isLoaded ? (
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
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProfessionalsOnlyPage;

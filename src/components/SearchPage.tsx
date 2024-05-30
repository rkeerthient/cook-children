import {
  Result,
  useSearchActions,
  VerticalResults as VR,
} from "@yext/search-headless-react";
import {
  AppliedFilters,
  Pagination,
  ResultsCount,
  SearchBar,
  VerticalResults,
  StandardCard,
  Geolocation,
  onSearchFunc,
} from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import { verticals } from "../templates";
import ProfessionalCard from "./cards/ProfessionalCard";
import { ReviewsData, useLocationsContext } from "../common/LocationsContext";
import { Ratings } from "../types/ratings";
type verticalInterface = {
  name: string;
  key: string;
};
const SearchPage = () => {
  const context = useLocationsContext();

  const { setReviewsData } = context;
  const [results, setResults] = useState<
    (VR[] | Result<Record<string, unknown>>)[]
  >([]);
  const searchActions = useSearchActions();
  const [currentVertical, setCurrentVertical] = useState<verticalInterface>({
    name: "All",
    key: "all",
  });

  useEffect(() => {
    if (!results) return;

    const ids: string[] = [];

    if (currentVertical.key !== "all") {
      results.forEach((item: any) => ids.push(item.rawData.npi));
    } else {
      results.forEach((result: any) => {
        if (result.verticalKey === "healthcare_professionals") {
          ids.push(result.npi);
        }
      });
    }

    ids && getReviews(ids, results.length);
  }, [results]);

  const getReviews = async (ids: string[], _length: number) => {
    const url = `/api/getRatings?npis=${ids.join(",")}&length=${_length}`;
    try {
      let requ = await fetch(url);
      const res: Ratings = await requ.json();
      let resBuilder: ReviewsData[] = [];
      res.entities.forEach((item) => {
        resBuilder.push({
          ratingValue: item.overallRating.value,
          ratingCount: item.totalRatingCount,
          commentsCount: item.totalCommentCount,
          npi: item.id,
        });
      });
      console.log(JSON.stringify(resBuilder));
      setReviewsData(resBuilder);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const executeSearch = () => {
    if (currentVertical.key === "all") {
      searchActions.setUniversal();
      searchActions
        .executeUniversalQuery()
        .then((res: any) => setResults(res?.verticalResults));
    } else {
      searchActions.setVertical(currentVertical.key);
      searchActions
        .executeVerticalQuery()
        .then((res: any) => setResults(res?.verticalResults.results));
    }
  };
  useEffect(() => {
    executeSearch();
  }, [currentVertical]);

  const handleSearch: onSearchFunc = (searchEventData) => {
    const { query } = searchEventData;
    const queryParams = new URLSearchParams(window.location.search);
    executeSearch();

    if (query) {
      queryParams.set("query", query);
    } else {
      queryParams.delete("query");
    }
    history.pushState(null, "", "?" + queryParams.toString());
  };
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="bg-[#e7eaea]">
        <div className="centered-container">
          <div className="px-8 pt-8">
            <SearchBar onSearch={handleSearch}></SearchBar>
            <ul className="pt-10 flex">
              {verticals.map((item, index) => {
                const { name, key: _key } = item;
                return (
                  <li
                    onClick={() => setCurrentVertical(item)}
                    key={index}
                    className={`tracking-[1.1px] relative px-5 pb-2 hover:cursor-pointer ${currentVertical.name === item.name && `active-nav-item `}`}
                  >
                    {name}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full">
        <div className="centered-container flex mt-4">
          <div className="flex-grow">
            <div className="flex flex-col items-baseline">
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
      </div>
    </div>
  );
};

export default SearchPage;

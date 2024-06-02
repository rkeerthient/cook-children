import {
  Result,
  UniversalLimit,
  useSearchActions,
  VerticalResults as VR,
} from "@yext/search-headless-react";
import { onSearchFunc, SearchBar } from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import { ReviewsData, useLocationsContext } from "../common/LocationsContext";
import { verticals } from "../templates";
import { Ratings } from "../types/ratings";
import FAQPage from "./pages/FAQPage";
import Locator from "./pages/LocationsPage";
import ProfessionalPage from "./pages/ProfessionalPage";
import ServicePage from "./pages/ServicePage";
import UniversalPage from "./pages/UniversalPage";
import { useTypingEffect } from "./useTypeEffect";
type verticalInterface = {
  name: string;
  key: string;
};
const SearchPage = () => {
  const { queryPrompts } = useTypingEffect(
    import.meta.env.YEXT_PUBLIC_API_KEY,
    import.meta.env.YEXT_PUBLIC_EXP_KEY
  );
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
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
  const universalLimit: UniversalLimit = {
    faqs: 4,
    healthcare_facilities: 4,
    healthcare_professionals: 4,
    specialties: 4,
  };
  useEffect(() => {
    if (!results) return;
    const ids: string[] = [];
    if (
      currentVertical.key !== "all" &&
      currentVertical.key === "healthcare_professionals"
    ) {
      results.forEach((item: any) => ids.push(item.rawData.npi));
    } else {
      results.forEach((_results: any) => {
        if (_results.verticalKey === "healthcare_professionals") {
          _results.results.map((item: any) => ids.push(item.rawData.npi));
        }
      });
    }
    ids.length >= 1 && getReviews(ids, results.length);
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
      setReviewsData(resBuilder);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const executeSearch = () => {
    setIsLoaded(false);
    if (currentVertical.key === "all") {
      searchActions.setUniversal();
      searchActions.setUniversalLimit(universalLimit);
      searchActions
        .executeUniversalQuery()
        .then((res: any) => {
          setResults(res?.verticalResults);
        })
        .finally(() => setIsLoaded(true));
    } else {
      searchActions.setVertical(currentVertical.key);
      searchActions
        .executeVerticalQuery()
        .then((res: any) => setResults(res?.verticalResults.results))
        .finally(() => setIsLoaded(true));
    }
  };
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    executeSearch();
    if (currentVertical) {
      searchParams.set("vertical", currentVertical.key);
    } else {
      searchParams.delete("vertical");
    }
    history.pushState(null, "", "?" + searchParams.toString());
  }, [currentVertical]);

  const handleSearch: onSearchFunc = (searchEventData) => {
    const { query } = searchEventData;
    const searchParams = new URLSearchParams(window.location.search);
    executeSearch();

    if (query) {
      searchParams.set("query", query);
    } else {
      searchParams.delete("query");
    }
    history.pushState(null, "", "?" + searchParams.toString());
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="bg-[#e7eaea]">
        <div className="centered-container">
          <div className="px-8 pt-8">
            <SearchBar
              onSearch={handleSearch}
              customCssClasses={{ inputElement: "demo " }}
            ></SearchBar>
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
      <div className="w-full ">
        {currentVertical &&
          (currentVertical.key === "faqs" ? (
            <FAQPage verticalKey={currentVertical.key} />
          ) : currentVertical.key === "specialties" ? (
            <ServicePage verticalKey={currentVertical.key} />
          ) : currentVertical.key === "healthcare_professionals" ? (
            <ProfessionalPage verticalKey={currentVertical.key} />
          ) : currentVertical.key === "healthcare_facilities" ? (
            <Locator verticalKey={currentVertical.key} />
          ) : (
            <UniversalPage />
          ))}
      </div>
    </div>
  );
};

export default SearchPage;

import { useSearchActions } from "@yext/search-headless-react";
import {
  AppliedFilters,
  Pagination,
  ResultsCount,
  SearchBar,
  LocationBias,
  VerticalResults,
  StandardCard,
  Geolocation,
} from "@yext/search-ui-react";
import { useEffect, useState } from "react";
import { verticals } from "../templates";
import FAQCard from "./cards/FAQCard";
type verticalInterface = {
  name: string;
  key: string;
};
const SearchPage = () => {
  const searchActions = useSearchActions();
  const [currentVertical, setCurrentVertical] = useState<verticalInterface>({
    name: "All",
    key: "all",
  });

  useEffect(() => {
    if (currentVertical.key === "all") {
      searchActions.setUniversal();
      searchActions
        .executeUniversalQuery()
        .then((res) => console.log(JSON.stringify(res)));
    } else {
      searchActions.setVertical(currentVertical.key);
      searchActions
        .executeVerticalQuery()
        .then((res) => console.log(JSON.stringify(res)));
    }
  }, [currentVertical]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="bg-[#e7eaea]">
        <div className="centered-container">
          <div className="px-8 pt-8">
            <SearchBar></SearchBar>
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
              CardComponent={FAQCard}
              customCssClasses={{
                verticalResultsContainer: "flex flex-col gap-4",
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

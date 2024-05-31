import {
  Matcher,
  SelectableStaticFilter,
  useSearchActions,
  useSearchState,
} from "@yext/search-headless-react";
import {
  AppliedFilters,
  Geolocation,
  MapboxMap,
  OnDragHandler,
  Pagination,
  ResultsCount,
  VerticalResults,
} from "@yext/search-ui-react";
import { LngLat, LngLatBounds } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import * as React from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import { useLocationsContext } from "../../common/LocationsContext";
import MapPin from "../MapPin";
import LocationCard from "../cards/LocationCard";

const LocationsPage = () => {
  const searchActions = useSearchActions();
  const filters = useSearchState((state) => state.filters.static);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const {
    selectedLocationId: _selectedLocationId,
    setSelectedLocationId: _setSelectedLocationId,
  } = useLocationsContext();

  useEffect(() => {
    selectedLocationId && _setSelectedLocationId(selectedLocationId);
  }, [selectedLocationId]);

  useLayoutEffect(() => {
    setIsLoading(true);
    searchActions.setVertical("healthcare_facilities");
    searchActions.setVerticalLimit(10);
    searchActions.executeVerticalQuery().then(() => setIsLoading(false));
  }, [searchActions]);

  const onDrag: OnDragHandler = React.useCallback(
    (center: LngLat, bounds: LngLatBounds) => {
      const radius = center.distanceTo(bounds.getNorthEast());
      const nonLocationFilters: SelectableStaticFilter[] =
        filters?.filter(
          (f) =>
            f.filter.kind !== "fieldValue" ||
            f.filter.fieldId !== "builtin.location"
        ) ?? [];
      const nearFilter: SelectableStaticFilter = {
        selected: true,
        displayName: "Near Current Area",
        filter: {
          kind: "fieldValue",
          fieldId: "builtin.location",
          matcher: Matcher.Near,
          value: { ...center, radius },
        },
      };
      searchActions.setStaticFilters([...nonLocationFilters, nearFilter]);
      searchActions.executeVerticalQuery();
    },
    [filters, searchActions]
  );

  return (
    <>
      {!isLoading && (
        <div className="flex flex-row">
          <div className="flex flex-col w-2/5 p-4 relative">
            <>
              <div>
                <ResultsCount />
                <AppliedFilters />
                <VerticalResults
                  CardComponent={LocationCard}
                  customCssClasses={{
                    verticalResultsContainer:
                      "flex flex-col gap-4 h-[95vh] overflow-scroll ",
                  }}
                />
              </div>
              <div className="mt-4">
                <Pagination />
                <Geolocation
                  customCssClasses={{
                    iconContainer: "none",
                    geolocationContainer: "flex flex-col lg:flex-col",
                  }}
                />
              </div>
            </>
          </div>
          <div className=" w-3/5 h-screen">
            <MapboxMap
              mapboxOptions={{
                zoom: 4,
              }}
              mapboxAccessToken={import.meta.env.YEXT_PUBLIC_MAP_API_KEY || ""}
              PinComponent={(props: any) => (
                <MapPin
                  {...props}
                  selectedLocationId={selectedLocationId}
                  setSelectedLocationId={setSelectedLocationId}
                  selectedLocationFromContext={_selectedLocationId}
                ></MapPin>
              )}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LocationsPage;

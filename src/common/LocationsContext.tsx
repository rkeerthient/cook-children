import * as React from "react";
import { useState, useContext } from "react";

export interface ReviewsData {
  ratingValue: number;
  ratingCount: number;
  commentsCount: number;
  npi: string;
}

interface ContextType {
  reviewsData: ReviewsData[];
  setReviewsData: React.Dispatch<React.SetStateAction<ReviewsData[]>>;
  selectedLocation: any;
  setSelectedLocation: React.Dispatch<React.SetStateAction<any>>;
  hoveredLocation: any;
  setHoveredLocation: React.Dispatch<React.SetStateAction<any>>;
}

const LocationsContext = React.createContext<ContextType | undefined>(
  undefined
);

export const LocationsProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [hoveredLocation, setHoveredLocation] = useState<any>(null);
  const [reviewsData, setReviewsData] = useState<ReviewsData[]>([]);

  return (
    <LocationsContext.Provider
      value={React.useMemo(
        () => ({
          selectedLocation,
          setSelectedLocation,
          hoveredLocation,
          setHoveredLocation,
          reviewsData,
          setReviewsData,
        }),
        [selectedLocation, hoveredLocation, reviewsData]
      )}
    >
      {children}
    </LocationsContext.Provider>
  );
};

export const useLocationsContext = () => {
  const context = useContext(LocationsContext);
  if (!context) {
    throw new Error(
      "useLocationsContext must be used within a LocationsProvider"
    );
  }
  return context;
};

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
  selectedLocationId: any;
  setSelectedLocationId: React.Dispatch<React.SetStateAction<any>>;
  hoveredLocationId: any;
  setHoveredLocationId: React.Dispatch<React.SetStateAction<any>>;
  clicked: any;
  setClicked: React.Dispatch<React.SetStateAction<any>>;
}

const LocationsContext = React.createContext<ContextType | undefined>(
  undefined
);

export const LocationsProvider = ({
  children,
}: React.PropsWithChildren<unknown>) => {
  const [selectedLocationId, setSelectedLocationId] = useState<any>(null);
  const [hoveredLocationId, setHoveredLocationId] = useState<any>(null);
  const [clicked, setClicked] = useState<any>(null);
  const [reviewsData, setReviewsData] = useState<ReviewsData[]>([]);

  return (
    <LocationsContext.Provider
      value={React.useMemo(
        () => ({
          selectedLocationId,
          setSelectedLocationId,
          hoveredLocationId,
          setHoveredLocationId,
          reviewsData,
          setReviewsData,
          clicked,
          setClicked,
        }),
        [selectedLocationId, hoveredLocationId, reviewsData, clicked]
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

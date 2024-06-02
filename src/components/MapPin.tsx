import { Result } from "@yext/search-headless-react";
import { LngLatLike, Popup, Map } from "mapbox-gl";
import { useState, useRef, useEffect } from "react";
import HealthcareFacility from "../types/healthcare_facilities";
import { Coordinate } from "@yext/pages-components";
import { FaLocationPin } from "react-icons/fa6";
import { renderToString } from "react-dom/server";
import { LiaDirectionsSolid } from "react-icons/lia";
import { BsGlobe } from "react-icons/bs";
import { getDirectionsUrl } from "./cards/LocationCard";

const transformToMapboxCoord = (
  coordinate: Coordinate
): LngLatLike | undefined => {
  if (!coordinate.latitude || !coordinate.longitude) return;
  return {
    lng: coordinate.longitude,
    lat: coordinate.latitude,
  };
};

const getLocationHTML = (location: HealthcareFacility, index: any) => {
  const {
    address: { line1, line2, city, region, postalCode },
    name,
    mainPhone,
    landingPageUrl,
  } = location;
  const address = location.address;
  const html = (
    <div className="space-y-2  p-3 text-base">
      <a
        href={landingPageUrl}
        className=" outline-transparent text-primary text-lg flex hover:underline items-center"
      >
        <span className="mr-2 text-xs  w-6 h-6 rounded-full bg-primary text-white flex justify-center items-center">
          {index! + 1}
        </span>
        {name}
      </a>
      <div>{line1}</div>
      <div>{`${city}, ${region}, ${postalCode}`}</div>
      <div className="flex text-sm flex-col md:flex-row gap-4 md:gap-8 justify-start md:items-center pt-4 pb-2">
        <a
          className="cta flex gap-2 items-center"
          href={`${getDirectionsUrl(address)}`}
        >
          <LiaDirectionsSolid className="w-4 h-4" />
          Get Directions
        </a>
        <a className="cta flex gap-2 items-center" href={landingPageUrl}>
          <BsGlobe className="w-4 h-4" />
          Visit page
        </a>
      </div>
    </div>
  );

  return renderToString(html);
};

export interface MapPinProps {
  mapbox: Map;
  result: Result<HealthcareFacility>;
  index: number;
  selectedLocationId?: string;
  selectedLocationFromContext?: string;
  setSelectedLocationId?: (value: string) => void;
}

const MapPin = ({
  mapbox,
  result,
  index,
  selectedLocationId,
  selectedLocationFromContext,
  setSelectedLocationId,
}: MapPinProps) => {
  const location = result.rawData;
  const [isActive, setIsActive] = useState<boolean>();
  const popupRef = useRef(new Popup({ offset: 15 }));
  useEffect(() => {
    if (selectedLocationFromContext) {
      document
        .querySelectorAll(".mapboxgl-popup")
        .forEach((item) => item.remove());

      setIsActive(selectedLocationFromContext === location.id);
    }
  }, [selectedLocationFromContext, location.id]);

  useEffect(() => {
    if (isActive && location.yextDisplayCoordinate) {
      const mapboxCoordinate = transformToMapboxCoord(
        location.yextDisplayCoordinate
      );
      if (mapboxCoordinate) {
        popupRef.current
          .setLngLat(mapboxCoordinate)
          .setMaxWidth("fit-content")
          .setHTML(getLocationHTML(location, index))
          .addTo(mapbox);
      }
    } else {
      popupRef.current.remove();
    }
  }, [isActive, mapbox, location]);

  const handleClick = () => {
    setSelectedLocationId(isActive ? "" : location.id);
  };

  return (
    <button onClick={handleClick}>
      <div className="relative flex items-center justify-center h-8 w-8">
        <FaLocationPin
          className={`absolute text-[#013b5b] hover:text-[#147b94] w-full h-full ${isActive ? "h-10 w-10" : "h-8 w-8"}`}
        />
        <span className="absolute text-white font-bold">{index + 1}</span>
      </div>
    </button>
  );
};

export default MapPin;

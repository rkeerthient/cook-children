import { CardProps } from "@yext/search-ui-react";
import { BsClock, BsGlobe, BsPin } from "react-icons/bs";
import { CiPhone } from "react-icons/ci";
import { LiaDirectionsSolid } from "react-icons/lia";
import HoursText from "../HoursText";
import HealthcareFacility from "../../types/healthcare_facilities";
import { useLocationsContext } from "../../common/LocationsContext";
import { useEffect, useRef } from "react";

const LocationCard = ({ result }: CardProps<HealthcareFacility>) => {
  const { setSelectedLocationId, selectedLocationId } = useLocationsContext();
  const listItemRef = useRef<HTMLDivElement | null>(null);

  const { name, distance, index } = result;
  const {
    slug,
    landingPageUrl,
    address,
    id,
    hours,
    timezone,
    mainPhone,
    c_locationPhoto,
  } = result.rawData;

  useEffect(() => {
    if (selectedLocationId === result.id) {
      listItemRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [selectedLocationId, result.id]);
  return (
    <div
      ref={listItemRef}
      id={id}
      onClick={() => setSelectedLocationId(id)}
      className={`w-full  text-sm font-medium  flex items-center text-secondary justify-between border rounded-md hover:cursor-pointer ${selectedLocationId === id && `border-secondary`}`}
    >
      <div
        className={`w-1/3 bg-cover h-[250px]`}
        style={{ backgroundImage: `url(${c_locationPhoto?.url})` }}
      />

      <div className="flex ml-4 flex-col text-secondary w-2/3">
        <div className="flex w-full">
          <div className="flex flex-col justify-between gap-4 ">
            <a
              href={landingPageUrl}
              className="  text-primary text-lg flex hover:underline items-center"
            >
              <span className="mr-2 text-xs  w-6 h-6 rounded-full bg-primary text-white flex justify-center items-center">
                {index!}
              </span>
              {name}
            </a>
            <div className="flex w-full justify-between items-center">
              <div className="flex items-center gap-2">
                <div>
                  <BsClock />
                </div>
                <div>
                  {hours ? (
                    <HoursText timezone={timezone} hours={hours} />
                  ) : (
                    <div>Fill in your hours</div>
                  )}
                </div>
              </div>
              <div>{(distance! / 1609).toFixed(2)} mi</div>
            </div>

            <div className="flex items-center gap-2">
              <div>
                <CiPhone />
              </div>
              <div>
                {mainPhone &&
                  mainPhone
                    .replace("+1", "")
                    .replace(/\D+/g, "")
                    .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
              </div>
            </div>
            <div className="flex items-base gap-2">
              <div>
                <BsPin className="mt-2" />
              </div>
              <div className="flex flex-col text-gray-600 text-sm">
                <div>{address?.line1}</div>
                <div>
                  {address?.city}, {address?.region} {address?.postalCode}
                </div>
              </div>
            </div>
          </div>
        </div>
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
    </div>
  );
};

export default LocationCard;
export const getDirectionsUrl = (addr?: any) => {
  const region = addr.region ? ` ${addr.region}` : ``;
  const rawQuery = `${addr.line1},${addr.city},${region} ${addr.postalCode} ${addr.countryCode}`;
  const query = encodeURIComponent(rawQuery);
  const url = `https://www.google.com/maps/search/?api=1&query=${query}&output=classic`;
  return url;
};

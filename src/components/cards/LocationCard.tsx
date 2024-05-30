import { CardProps } from "@yext/search-ui-react";
import { BsClock, BsGlobe, BsPin } from "react-icons/bs";
import { CiPhone } from "react-icons/ci";
import { LiaDirectionsSolid } from "react-icons/lia";
import HoursText from "../HoursText";
import HealthcareFacility from "../../types/healthcare_facilities";
import { useLocationsContext } from "../../common/LocationsContext";

const LocationCard = ({ result }: CardProps<HealthcareFacility>) => {
  const { setSelectedLocationId } = useLocationsContext();

  const { name } = result;
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

  const getDirectionsUrl = (addr?: any) => {
    const region = addr.region ? ` ${addr.region}` : ``;
    const rawQuery = `${addr.line1},${addr.city},${region} ${addr.postalCode} ${addr.countryCode}`;
    const query = encodeURIComponent(rawQuery);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}&output=classic`;
    return url;
  };

  return (
    <div
      id={id}
      onClick={() => setSelectedLocationId(id)}
      className={`w-full pointer-events-none text-sm font-medium  flex items-center   text-secondary   justify-between border rounded-md hover:cursor-pointer `}
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
              className="  text-primary text-lg flex gap-4 items-center hover:underline"
            >
              {name}
            </a>
            <div className="flex items-center gap-2">
              <div>
                <BsClock />
              </div>
              <div>
                {hours ? (
                  <HoursText timezone={timezone} hours={hours} />
                ) : (
                  <>Fill in your hours</>
                )}
              </div>
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
          <a className="cta flex gap-2 items-center" href={`/${slug}`}>
            <BsGlobe className="w-4 h-4" />
            Visit page
          </a>
        </div>
        {/* <div className="flex mt-2">
          <div className="flex flex-col justify-between gap-4  ">
            <div className="flex gap-4  items-center justify-between w-full">
              <div className="m-auto flex flex-col gap-6">
                <a
                  target="_blank"
                  href={`${getDirectionsUrl(address)}`}
                  className="w-52 uppercase bg-[#027da5] flex justify-center items-center gap-2  text-sm text-white hover:text-white border-2 border-[#027da5] hover:bg-[#027da5] hover:cursor-pointer font-bold text-center rounded-sm px-4 py-2"
                >
                  <LiaDirectionsSolid className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
              <div className="m-auto flex flex-col gap-6">
                <a
                  href={`/${slug}`}
                  className="w-52 mx-auto uppercase bg-[#027da5] flex justify-center items-center gap-2  text-sm text-white hover:text-white border-2 border-[#027da5] hover:bg-[#027da5] hover:cursor-pointer font-bold text-center rounded-sm px-4 py-2"
                >
                  <BsGlobe className="w-4 h-4" />
                  Visit page
                </a>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default LocationCard;

import { CardProps } from "@yext/search-ui-react";
import HealthcareProfessional from "../../types/healthcare_professionals";
import { HoursStatus, Image } from "@yext/pages-components";
import { CheckIcon, PhoneIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { Entity, Ratings } from "../../types/ratings";

const ProfessionalCard = ({ result }: CardProps<HealthcareProfessional>) => {
  const [reviewData, setReviewData] = useState<Entity>();
  const { name } = result;
  const {
    headshot,
    c_specialty,
    mainPhone,
    hours,
    landingPageUrl,
    reservationUrl,
    c_acceptingPatientsAges03,
    acceptingNewPatients,
    npi,
  } = result.rawData;

  // useEffect(() => {
  //   const getReviews = async () => {
  //     const url = `/api/getRatings?npi=${npi}`;
  //     try {
  //       let requ = await fetch(url);
  //       const res: Ratings = await requ.json();

  //       setReviewData(res.entities[0]);
  //     } catch (error) {
  //       console.error("Error fetching reviews:", error);
  //     }
  //   };

  //   getReviews();
  // }, []);

  return (
    <div className="border rounded-lg">
      <div className="relative flex flex-col">
        <a
          href={landingPageUrl}
          className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-t-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 bottom-12"
        >
          <Image
            image={headshot!}
            className="pointer-events-none object-cover group-hover:opacity-75"
          />
        </a>
        <a
          href={landingPageUrl}
          className="text-primary text-lg font-bold px-2 mt-4"
        >
          {name}
        </a>
        <div className="px-2 space-y-1">
          {reviewData ? (
            <div className="flex flex-col gap-1">
              <div>{reviewData.overallRating.value}/5</div>
              <div>{reviewData.totalRatingCount}</div>
            </div>
          ) : (
            <div className="animate-pulse flex flex-col gap-1">
              <div className="  bg-slate-400 rounded"><span className="invisible">Loading</span></div>
              <div className="  bg-slate-400 rounded"><span className="invisible">Loading</span></div>
            </div>
          )}
          <p className="pointer-events-none block  text-lg font-medium text-[#2aa67c]">
            {c_specialty}
          </p>
          <HoursStatus
            hours={hours}
            className="pointer-events-none block text-sm font-medium text-secondary"
          />
          <div className="pointer-events-none flex justify-center md:justify-start font-medium leading-loose items-center text-sm text-secondary">
            <PhoneIcon className="h-4 w-4" />
            {mainPhone && (
              <span className="ml-2">
                {mainPhone
                  .replace("+1", "")
                  .replace(/\D+/g, "")
                  .replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3")}
              </span>
            )}
          </div>

          <p className="pointer-events-none text-sm font-medium  flex items-center gap-1 text-secondary">
            {acceptingNewPatients ? (
              <CheckIcon className="h-4 w-4 text-green-700" />
            ) : (
              <XMarkIcon className="h-4 w-4 text-red-700" />
            )}
            Accepting all new patients
          </p>
          <p className="pointer-events-none text-sm font-medium  flex items-center gap-1 text-secondary">
            {c_acceptingPatientsAges03 ? (
              <CheckIcon className="h-4 w-4 text-green-700" />
            ) : (
              <XMarkIcon className="h-4 w-4 text-red-700" />
            )}
            Accepting patients ages 0-3
          </p>
          <div className="flex flex-col text-sm gap-2 justify-start pt-4 pb-2 ">
            {reservationUrl && (
              <a className="cta !w-fit" href={reservationUrl.url}>
                Request an appointment
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalCard;
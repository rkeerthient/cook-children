import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { CheckIcon, PhoneIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { Image } from "@yext/pages-components";
import { CardProps } from "@yext/search-ui-react";
import { useState } from "react";
import StarRatings from "react-star-ratings";
import { useLocationsContext } from "../../common/LocationsContext";
import HealthcareProfessional from "../../types/healthcare_professionals";
import AppointmentForm from "../AppointmentForm";
import HoursText from "../HoursText";

const ProfessionalCard = ({ result }: CardProps<HealthcareProfessional>) => {
  let [isOpen, setIsOpen] = useState(false);

  const { reviewsData } = useLocationsContext();
  const { name } = result;
  const {
    headshot,
    c_specialty,
    mainPhone,
    hours,
    landingPageUrl,
    c_acceptingPatientsAges03,
    acceptingNewPatients,
    npi,
    timezone,
  } = result.rawData;

  const ratingValue = reviewsData.find(
    (item: any) => item.npi === npi
  )?.ratingValue;
  const ratingCount = reviewsData.find(
    (item: any) => item.npi === npi
  )?.ratingCount;
  const commentsCount = reviewsData.find(
    (item: any) => item.npi === npi
  )?.commentsCount;

  return (
    <div
      className={`border rounded-lg ${isOpen ? `opacity-80` : `opacity-100`}`}
    >
      <div className={`relative flex flex-col`}>
        <a
          href={landingPageUrl}
          className="group aspect-square block w-full overflow-hidden rounded-t-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 bottom-12"
        >
          {headshot && (
            <Image
              image={headshot!}
              className="pointer-events-none object-cover group-hover:opacity-75"
            />
          )}
        </a>
        <a
          href={landingPageUrl}
          className="text-primary text-lg font-bold px-2 mt-4"
        >
          {name}
        </a>
        <div className="px-2 space-y-1">
          {reviewsData.length >= 1 ? (
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                {ratingValue ? (
                  <>
                    <StarRatings
                      rating={ratingValue}
                      starRatedColor="#ffb71d"
                      numberOfStars={5}
                      name="rating"
                      starDimension="22px"
                      starSpacing="1px"
                    />
                    <div>
                      {ratingValue}
                      /5 ({ratingCount})
                    </div>
                  </>
                ) : (
                  <div className="invisible">hi</div>
                )}
              </div>
              {commentsCount ? (
                <div className="pointer-events-none text-sm font-medium  flex items-center gap-1 text-secondary">
                  Verified patient reviews {commentsCount}
                </div>
              ) : (
                <div className="invisible">hi</div>
              )}
            </div>
          ) : (
            <div className="animate-pulse flex flex-col gap-1">
              <div className="  bg-slate-400 rounded">
                <span className="invisible">Loading</span>
              </div>
              <div className="  bg-slate-400 rounded">
                <span className="invisible">Loading</span>
              </div>
            </div>
          )}
          <p className="pointer-events-none block  text-lg font-medium text-[#2aa67c] h-12">
            {c_specialty}
          </p>
          {hours ? (
            <HoursText timezone={timezone} hours={hours} />
          ) : (
            <div>Fill in your hours</div>
          )}{" "}
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
            <div
              className="cta !w-fit !cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              Request an appointment
            </div>
          </div>
        </div>
      </div>
      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={() => setIsOpen(false)}
        >
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 transform-[scale(95%)]"
                enterTo="opacity-100 transform-[scale(100%)]"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 transform-[scale(100%)]"
                leaveTo="opacity-0 transform-[scale(95%)]"
              >
                <DialogPanel className="w-full max-w-7xl rounded-xl bg-white/5 p-6  ">
                  <AppointmentForm
                    professionalName={name!}
                    onClose={() => setIsOpen(false)}
                  ></AppointmentForm>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ProfessionalCard;

import { XMarkIcon } from "@heroicons/react/20/solid";
import calendar from "./icons/calendar.svg";
import insurance from "./icons/insurance.svg";
import people from "./icons/people.svg";
import select from "./icons/select.svg";

interface AppointmentProps {
  professionalName: string;
  onClose: (close: boolean) => void;
}

const AppointmentForm = ({ professionalName, onClose }: AppointmentProps) => {
  return (
    <div className="max-w-5xl pb-6 mx-auto  bg-white shadow-lg rounded  text-center">
      <div className="h-24 bg-[#f8f6f6] flex items-center justify-between w-full px-14">
        <h1 className="text-2xl font-bold ">
          You're scheduling an appointment with {professionalName}
        </h1>
        <XMarkIcon onClick={() => onClose(true)} className="w-8 h-8" />
      </div>
      <div className="px-14 mt-8">
        <p className="text-2xl font-bold mb-4">Let's get started!</p>
        <p className="mb-6 text-xl font-bold">
          Please have your insurance information handy.
        </p>
        <div className="grid grid-cols-4 gap-4 my-14">
          <div className=" flex items-center flex-col gap-4 mx-auto text-center">
            <div>
              <img
                src={select}
                alt="Select appointment type"
                className="w-[55px] h-[55px]"
              />
            </div>
            <div className="ml-4">
              <p className="font-light">1. Select your appointment type</p>
            </div>
          </div>
          <div className=" flex items-center flex-col gap-4 mx-auto text-center">
            <div>
              <img
                src={calendar}
                alt="Identify date/time"
                className="w-[55px] h-[55px]"
              />
            </div>
            <div className="ml-4">
              <p className="font-light">2. Identify the best date/time</p>
            </div>
          </div>
          <div className=" flex items-center flex-col gap-4 mx-auto text-center">
            <div>
              <img
                src={people}
                alt="Tell us about the patient"
                className="w-[55px] h-[55px]"
              />
            </div>
            <div className="ml-4">
              <p className="font-light">3. Tell us about the patient</p>
            </div>
          </div>
          <div className=" flex items-center flex-col gap-4 mx-auto text-center">
            <div>
              <img
                src={insurance}
                alt="Enter your insurance details"
                className="w-[55px] h-[55px]"
              />
            </div>
            <div className="ml-4">
              <p className="font-light">4. Enter your insurance details</p>
            </div>
          </div>
        </div>
      </div>
      <div className=" border border-t border-gray-300 mb-4"></div>
      <div className="px-14">
        <div className="cta !w-fit !ml-auto">Continue</div>
      </div>
    </div>
  );
};

export default AppointmentForm;

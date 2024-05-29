import { CardProps } from "@yext/search-ui-react";
import Ce_specialty from "../../types/specialties";

const ServicesCard = ({ result }: CardProps<Ce_specialty>) => {
  const { name } = result;
  const { description, c_primaryCTA, c_secondayCTA } = result.rawData;
  return (
    <div className="flex flex-col gap-4 border border-secondary p-4 rounded-md">
      <a href={c_secondayCTA?.link} className="text-primary text-xl font-bold">
        {name}
      </a>
      <div className="text-secondary text-lg">{description}</div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-start md:items-center">
        {c_primaryCTA && (
          <a className="cta" href={c_primaryCTA.link}>
            {c_primaryCTA.label}
          </a>
        )}
        {c_secondayCTA && (
          <a className="cta" href={c_secondayCTA.link}>
            {c_secondayCTA.label}
          </a>
        )}
      </div>
    </div>
  );
};

export default ServicesCard;

import Cta from "../components/cta";
import ProfessionalsOnlyPage from "./pages/ProfessionalsOnlyPage";

type Link = {
  label: string;
  url: string;
};

const links: any[] = [
  {
    label: "Find Care",
    url: "/",
  },
  {
    label: "For Patients",
    url: "/professionals.html",
  },
  {
    label: "For Providers",
    url: "/",
  },
  ,
  {
    label: "For community",
    url: "/",
  },
];

const Header = ({ _site }: any) => {
  const linkDoms = links.map((link) => (
    <div key={link.label}>
      <a href={link.url} target="_blank" rel="noreferrer">
        {link.label}
      </a>
    </div>
  ));

  return (
    <div className="p-6 flex justify-between items-center w-full max-w-screen-3xl">
      <img
        src="https://www.cookchildrens.org/siteassets/images/brand/cook_childrens_standard_spot.svg"
        alt=""
        className="w-auto h-20"
      />
      <div className="flex gap-8 items-center text-2xl text-primary">
        {links.map((item: Link, index: any) => (
          <a
            href={item.url}
            key={index}
            className={`${item.label === "For Patients" ? "hover:underline" : ""}`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Header;

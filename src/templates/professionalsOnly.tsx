/**
 * This is an example of how to create a static template that uses getStaticProps to retrieve data.
 */
import {
  GetHeadConfig,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateRenderProps,
} from "@yext/pages";
import SearchPage from "../components/SearchPage";
import PageLayout from "../components/page-layout";
import "../index.css";
import ProfessionalsOnlyPage from "../components/pages/ProfessionalsOnlyPage";

export const config: TemplateConfig = {
  name: "professionals search",
};

export const getPath = () => {
  return `professionals.html`;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "Cook Children's Professionals| Search",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: "Static page example meta description.",
        },
      },
    ],
  };
};

export const verticals = [
  {
    name: "All",
    key: "all",
  },
  {
    name: "FAQS",
    key: "faqs",
  },
  {
    name: "Healthcare Facilities",
    key: "healthcare_facilities",
  },
  {
    name: "Healthcare Professionals",
    key: "healthcare_professionals",
  },
  {
    name: "Services",
    key: "specialties",
  },
];

const Search: Template<TemplateRenderProps> = ({ document }) => {
  return (
    <>
      <PageLayout>
        <ProfessionalsOnlyPage verticalKey={"healthcare_professionals"} />
      </PageLayout>
    </>
  );
};

export default Search;

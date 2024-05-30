import Header from "./header";
import Footer from "./footer";
import {
  HeadlessConfig,
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import searchConfig from "./searchConfig";
import { useState } from "react";
import { Site } from "@yext/pages/*";
import { LocationsProvider } from "../common/LocationsContext";

type Props = {
  _site?: any;
  children?: React.ReactNode;
};
const PageLayout = ({ _site, children }: Props) => {
  return (
    <div className="min-h-screen">
      <Header _site={_site} />
      <div className="py-8">
        <LocationsProvider>
          <SearchHeadlessProvider searcher={provideHeadless(searchConfig)}>
            {children}
          </SearchHeadlessProvider>
        </LocationsProvider>
      </div>
      <Footer _site={_site}></Footer>
    </div>
  );
};

export default PageLayout;

import {
  SearchHeadlessProvider,
  provideHeadless,
} from "@yext/search-headless-react";
import { LocationsProvider } from "../common/LocationsContext";
import { chatConfig, searchConfig } from "./config";
import Footer from "./footer";
import Header from "./header";
import { ChatHeadlessProvider } from "@yext/chat-headless-react";
import { ChatPopUp } from "@yext/chat-ui-react";
import "@yext/chat-ui-react/bundle.css";

type Props = {
  _site?: any;
  children?: React.ReactNode;
};
const PageLayout = ({ _site, children }: Props) => {
  console.log(import.meta.env.YEXT_PUBLIC_CHAT_APIKEY);

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
      {import.meta.env.YEXT_PUBLIC_CHAT_APIKEY &&
        import.meta.env.YEXT_PUBLIC_CHAT_BOTID && (
          <ChatHeadlessProvider config={chatConfig}>
            <ChatPopUp
              title="Cook Children Chat"
              stream={false}
              customCssClasses={{
                buttonIcon: "text-white",
                button: "chatHeaderAndBotResponseColors",
                panelCssClasses: {
                  messageBubbleCssClasses: {
                    text: "text-base",
                    text__user: "chatHeaderAndBotResponseColors",
                    bubble__user: "chatHeaderAndBotResponseColors",
                  },

                  inputCssClasses: {
                    sendButton: "chatHeaderAndBotResponseColors",
                    textArea: "chatTextboxColor",
                  },
                },
                headerCssClasses: {
                  container: "chatHeaderAndBotResponseColors",
                  title: "overflow-hidden",
                },
              }}
            />
          </ChatHeadlessProvider>
        )}
    </div>
  );
};

export default PageLayout;

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Faq from "../../types/faqs";
import { CardProps } from "@yext/search-ui-react";
import { LexicalRichText } from "@yext/pages-components";

const FAQCard = ({ result }: CardProps<Faq>) => {
  const { question, answerV2, answer, c_primaryCTA, c_secondaryCTA } =
    result.rawData;
  return (
    <div className="w-full text-primary">
      <div className="mx-auto w-full divide-y divide-black/5 rounded-xl bg-black/5">
        <Disclosure as="div" className="px-6 py-3" defaultOpen={false}>
          <DisclosureButton className="group flex w-full items-center justify-between">
            <span className="text-left text-lg font-medium group-data-[hover]:/80">
              {question}
            </span>
            <ChevronDownIcon className="size-5 fill-black/60 group-data-[hover]:fill-black/50 group-data-[open]:rotate-180" />
          </DisclosureButton>
          <DisclosurePanel className="mt-2 text-sm/5 /50 flex flex-col text-secondary">
            <LexicalRichText serializedAST={JSON.stringify(answerV2.json)} />
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-start md:items-center pt-4 pb-2">
              {c_primaryCTA && (
                <a className="cta" href={c_primaryCTA.link}>
                  {c_primaryCTA.label}
                </a>
              )}
              {c_secondaryCTA && (
                <a className="cta" href={c_secondaryCTA.link}>
                  {c_secondaryCTA.label}
                </a>
              )}
            </div>
          </DisclosurePanel>
        </Disclosure>
      </div>
    </div>
  );
};

export default FAQCard;

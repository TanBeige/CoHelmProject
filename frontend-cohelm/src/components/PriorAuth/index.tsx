"use client";
import { AppContext } from "@/context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import { Outfit } from "next/font/google";
import Badge from "../design/Badge";
import Tooltip from "../design/Tooltip";
import { delay } from "@/utils/consts";
import { Option, PriorAuth } from "@/interfaces/PriorAuth";
import LoadingCircle from "../design/LoadingCircle";
import IsMetBadge from "../design/IsMetBadge";
import SinglePath from "./SinglePath";
import StepItem from "./StepItem";
import { steps } from "framer-motion";

const outfit = Outfit({ subsets: ["latin"] });

const PriorAuth = ({ id }: { id: number }) => {
  const { priorAuths } = useContext(AppContext);

  const [currentPriorAuths, setCurrentPriorAuths] = useState<
    PriorAuth[] | null
  >(null);
  const [copied, setCopied] = useState<boolean>(false);

  const copyCaseId = async () => {
    setCopied(true);
    navigator.clipboard.writeText(item.case_id);
    await delay(2500);
    setCopied(false);
  };

  const goToSection = (section: string) => {
    const element = document.getElementById(`section-${section}`);
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Normally you would use the API to set loading, but with localstorage this is the best way to handle it without hydration issues
    if (priorAuths !== null) {
      setCurrentPriorAuths(priorAuths);
    }
  }, [priorAuths]);

  if (currentPriorAuths === null) {
    return (
      <div className="w-20 h-20 mx-auto mt-32">
        <LoadingCircle />
      </div>
    );
  } else if (id == undefined || id === null || !currentPriorAuths?.[id]) {
    return <p>ID not found</p>;
  }
  const item = currentPriorAuths[Number(id)];

  return (
    <div className="mb-12">
      <div>
        {/* HEADER */}
        <div className="flex flex-row items-center mb-4 space-x-3">
          <p className="text-xl font-semibold ">{item.procedure_name}</p>
          <Tooltip position="bottom" label={copied ? "Copied!" : "Copy"}>
            <div
              className="transition-opacity hover:opacity-60 cursor-pointer"
              onClick={copyCaseId}
            >
              <Badge label={item.case_id} />
            </div>
          </Tooltip>
          <IsMetBadge is_met={item.is_met} />
        </div>
        {/* CPT CODES */}
        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-1">CPT Codes</p>
          <div className="flex flex-row items-center space-x-2">
            {item.cpt_codes.map((cpt) => (
              <Badge label={cpt} key={cpt} />
            ))}
          </div>
        </div>
        {/* STATUS AND PATH */}
        <div className="mb-4 flex flex-row space-x-4">
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="capitalize mt-1 text-lg">{item.status}</p>
          </div>

          <div className="">
            <p className="text-sm text-gray-500">Path</p>
            <div className="flex flex-row items-center space-x-1">
              {item.steps.map((st) => (
                <SinglePath
                  key={st.key}
                  pathKey={st.key}
                  is_met={st.is_met}
                  is_final={st.is_final}
                  handleClick={goToSection}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* SUMMARY */}
      <div>
        <p className="text-sm text-gray-500">Summary</p>
        <pre className={`text-wrap ${outfit.className}`}>{item.summary}</pre>
      </div>
      {/* STEPS */}
      <div className="flex flex-row mt-8 h-full">
        <div className="w-4 border-r-2 mr-6"></div>
        <div className="flex flex-col space-y-4 w-full">
          {item.steps.map((st) => {
            const selectedOptions: Option[] = st.options.filter(
              (o) => o.selected
            );
            return (
              <StepItem
                key={st.key}
                selectedOptions={selectedOptions}
                step={st}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PriorAuth;

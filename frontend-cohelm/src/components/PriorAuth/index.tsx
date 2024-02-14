"use client";
import { AppContext } from "@/context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import { Outfit } from "next/font/google";
import Badge from "../design/Badge";
import Tooltip from "../design/Tooltip";
import { delay } from "@/utils/consts";
import { PriorAuth } from "@/interfaces/PriorAuth";
import LoadingCircle from "../design/LoadingCircle";
import IsMetBadge from "../design/IsMetBadge";
import SinglePath from "./SinglePath";
import { MdCheckBox } from "react-icons/md";

const outfit = Outfit({ subsets: ["latin"] });

const PriorAuth = ({ id }: { id: number }) => {
  const { priorAuths } = useContext(AppContext);

  const [currentPriorAuths, setCurrentPriorAuths] = useState<
    PriorAuth[] | null
  >(null);
  const [copied, setCopied] = useState<boolean>(false);

  const copyCaseId = async () => {
    setCopied(true);
    navigator.clipboard.writeText(item.procedure_name);
    await delay(2500);
    setCopied(false);
  };

  useEffect(() => {
    // Normally you would use the API to set loading, but with localstorage this is the best way to handle it without hydration issues
    if (priorAuths !== null) {
      setCurrentPriorAuths(priorAuths);
    }
  }, [priorAuths]);

  if (currentPriorAuths === null) {
    return (
      <div className="w-40 h-40 mx-auto mt-32">
        <LoadingCircle />
      </div>
    );
  } else if (id == undefined || id === null || !currentPriorAuths?.[id]) {
    return <p>ID not found</p>;
  }
  const item = currentPriorAuths[Number(id)];

  return (
    <div>
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
        {/* STATUS AND PATH */}
        <div className="mb-4 flex flex-row space-x-4">
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="capitalize">{item.status}</p>
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
      <div className="flex flex-row h-96 mt-8">
        <div className="w-6 border-l-2"></div>
        <div className="flex flex-col space-y-4 w-full">
          {item.steps.map((st) => {
            const selectedOptions = st.options.filter((o) => o.selected);

            return (
              <div className="rounded-lg border p-3">
                <p className="text-gray-500 text-sm">Instructions</p>
                <div className="mb-3">
                  <p className="text-xl">{st.question}</p>
                </div>
                <div className="flex flex-col space-y-2 px-3 py-4 border-2 border-green-500 bg-gray-100 rounded-md">
                  {selectedOptions.map((selectedOption) => {
                    return (
                      <div className="flex flex-row items-center space-x-2">
                        <MdCheckBox />
                        <p className="text-gray-500">
                          <span className="font-semibold">
                            ({selectedOption.key})
                          </span>{" "}
                          {selectedOption.text}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div>
                  <p className="inline-block transition-colors text-sm text-gray-500 my-1 py-1 px-1 cursor-pointer hover:bg-gray-100">
                    Hide options
                  </p>

                  <div>{/* TABLE FOR ALL OPTIONS */}</div>
                </div>
                <div>
                  <p className="text-lg font-semibold">

                  Option{selectedOptions.length > 1 && "s"}{" "}
                  {selectedOptions.map((o, index) => (
                    <span>
                      {o.key}
                      {index < selectedOptions.length - 2
                        ? ", "
                        : `${
                            index < selectedOptions.length - 1 ? ", and " : ""
                          }`}
                    </span>
                  ))}{" "}
                  {selectedOptions.length > 1 ? "have" : "has"} been selected
                  because...
                  </p>

                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>{/* <p>{JSON.stringify(priorAuths[Number(id)])}</p> */}</div>
    </div>
  );
};

export default PriorAuth;

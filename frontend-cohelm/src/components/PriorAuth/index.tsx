"use client";
import { AppContext } from "@/context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import { Outfit } from "next/font/google";
import Badge from "../design/Badge";
import Tooltip from "../design/Tooltip";
import { delay } from "@/utils/consts";
import { PriorAuth } from "@/interfaces/PriorAuth";
import LoadingCircle from "../design/LoadingCircle";

const outfit = Outfit({ subsets: ["latin"] });

const PriorAuth = ({ id }: { id: number }) => {
  const { priorAuths } = useContext(AppContext);

  const [currentPriorAuths, setCurrentPriorAuths] = useState<PriorAuth[] | null>(null)
  const [copied, setCopied] = useState<boolean>(false);

  const copyCaseId = async () => {
    setCopied(true)
    navigator.clipboard.writeText(item.procedure_name);
    await delay(2500)
    setCopied(false)
  };

  useEffect(() => {
    // Normally you would use the API to set loading, but with localstorage this is the best way to handle it without hydration issues
    if (priorAuths !== null) {
      setCurrentPriorAuths(priorAuths);
    }
  }, [priorAuths]);

  if(currentPriorAuths === null) {
    return (
        <div className="w-40 h-40 mx-auto mt-32">
            <LoadingCircle />
        </div>
    )
  }

  else if (id == undefined || id === null ||  !currentPriorAuths?.[id]) {
    return <p>oopsie</p>;
  }
  const item = currentPriorAuths[Number(id)];
  return (
    <div>
      <div>
        <div className="flex flex-row items-center mb-2 space-x-3">
          <p className="text-xl font-semibold ">{item.procedure_name}</p>
          <Tooltip position="bottom" label={copied ? "Copied!" : "Copy"}>
            <div
              className="transition-opacity hover:opacity-60 cursor-pointer"
              onClick={copyCaseId}
            >
              <Badge label={item.case_id} />
            </div>
          </Tooltip>
        </div>
        <div className="mb-2">
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <p className="capitalize">{item.status}</p>
          </div>
        </div>
        <div className="mb-4">
          <p>Path</p>
        </div>
      </div>
      <div>
        <p className="text-sm text-gray-500">Summary</p>
        <pre className={`text-wrap ${outfit.className}`}>{item.summary}</pre>
      </div>
      <div>{/* <p>{JSON.stringify(priorAuths[Number(id)])}</p> */}</div>
    </div>
  );
};

export default PriorAuth;

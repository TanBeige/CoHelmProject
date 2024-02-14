import { Option, Step } from "@/interfaces/PriorAuth";
import React from "react";
import { BiCheckCircle, BiXCircle } from "react-icons/bi";
import QuestionAndOptions from "./QuestionAndOptions";
import NextLogic from "./NextLogic";
import Evidence from "./Evidence";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

interface StepProps {
  step: Step;
  selectedOptions: Option[];
}

const StepItem = ({ step, selectedOptions }: StepProps) => {
  return (
    <div className="relative" id={`section-${step.key}`}>
      <div className="absolute -left-11 -ml-[1px] top-0 ">
        {step.is_met ? (
          <BiCheckCircle className="h-10 w-10 bg-white text-green-500 rounded-full" />
        ) : (
          <BiXCircle className="h-10 w-10 bg-white text-red-500 rounded-full" />
        )}
      </div>

      <div className="rounded-lg border p-4">
        <p className="text-gray-500 text-sm">Instructions</p>
        <div>
          <QuestionAndOptions
            is_met={step.is_met}
            question={step.question}
            selectedOptions={selectedOptions}
            allOptions={step.options}
          />
        </div>
        <div>
          <p className="text-lg font-semibold">
            Option{selectedOptions.length > 1 && "s"}{" "}
            {selectedOptions.map((o, index) => (
              <span>
                {o.key}
                {index < selectedOptions.length - 2
                  ? ", "
                  : `${index < selectedOptions.length - 1 ? ", and " : ""}`}
              </span>
            ))}{" "}
            {selectedOptions.length > 1 ? "have" : "has"} been selected
            because...
          </p>
          <div className="my-2">
            <pre className={`text-wrap leading-6 ${outfit.className}`}>
              {step.reasoning}
            </pre>
          </div>
        </div>
        <div>
          <Evidence evidence={step.evidence} />
        </div>
        {/* NEXT STEP */}
        {parseInt(step.key) !== 0 && (
          <NextLogic
            selectedOptions={selectedOptions}
            next_logic={step.logic_string}
            next_step={step.next_step}
          />
        )}
      </div>
    </div>
  );
};

export default StepItem;

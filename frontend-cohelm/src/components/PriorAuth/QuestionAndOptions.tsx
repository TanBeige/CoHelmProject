import { Option } from "@/interfaces/PriorAuth";
import React, { useState } from "react";
import { MdCheckBox } from "react-icons/md";
import Checkbox from "../design/Checkbox";
import Fade from "../animations/Fade";

interface QuestionAndOptionsProps {
  question: string;
  allOptions: Option[];
  selectedOptions: Option[];
}

const QuestionAndOptions = ({
  question,
  allOptions,
  selectedOptions,
}: QuestionAndOptionsProps) => {

  const [openOptions, setOpenOptions] = useState<boolean>(false);

  return (
    <div>
      <div className="mb-3">
        <p className="text-xl">{question}</p>
      </div>
      <div className="flex flex-col space-y-2 px-3 py-4 border-2 border-green-500 bg-gray-100 rounded-md">
        {selectedOptions.map((selectedOption: Option) => {
          return (
            <div className="flex flex-row items-center space-x-2">
              <Checkbox checked={true}/>
              <p className="text-gray-500">
                <span className="font-semibold">({selectedOption.key})</span>{" "}
                {selectedOption.text}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mb-4">
        <p onClick={()=>setOpenOptions(!openOptions)} className="inline-block transition-colors text-sm text-gray-500 my-1 py-1 px-1 rounded cursor-pointer hover:bg-gray-100">
          {openOptions ? "Hide" : "Show all"} options
        </p>
        {
            openOptions &&
            <Fade fadeKey={question} fadeDuration={0.2}>
        <div className="ml-1">
          {allOptions.map((o: Option) => {
            return (
              <div className="flex flex-row items-center space-x-2">
              <Checkbox checked={o.selected}/>

                <p className="text-gray-500">
                  <span className="font-semibold">({o.key})</span>{" "}
                  {o.text}
                </p>
              </div>
            );
          })}
        </div>
        </Fade>

        }

      </div>
    </div>
  );
};

export default QuestionAndOptions;

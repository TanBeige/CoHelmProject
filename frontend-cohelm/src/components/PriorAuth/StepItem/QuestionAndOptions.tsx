import { Option } from "@/interfaces/PriorAuth";
import React, { useState } from "react";
import { MdCheckBox } from "react-icons/md";
import Checkbox from "../../design/Checkbox";
import Fade from "../../animations/Fade";
import CollapseButton from "../../design/CollapseButton";

interface QuestionAndOptionsProps {
  question: string;
  allOptions: Option[];
  selectedOptions: Option[];
  is_met: boolean;
}

const QuestionAndOptions = ({
  question,
  allOptions,
  selectedOptions,
  is_met,
}: QuestionAndOptionsProps) => {
  const [openOptions, setOpenOptions] = useState<boolean>(false);

  return (
    <div>
      <div className="mb-3">
        <p className="text-xl">{question}</p>
      </div>
      <div
        className={`flex flex-col space-y-2 px-3 py-4 border-2  ${
          is_met ? "border-green-500 bg-green-100" : "border-red-500 bg-red-100"
        }  rounded-md`}
      >
        {selectedOptions.map((selectedOption: Option) => {
          return (
            <div className="flex flex-row items-center space-x-2">
              <Checkbox checked={true} color={is_met ? "green" : "red"} />
              <p className="text-gray-500">
                <span className="font-semibold">({selectedOption.key})</span>{" "}
                {selectedOption.text}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mb-4">
        <div className="my-1">

        <CollapseButton onClick={() => setOpenOptions(!openOptions)}>
          {openOptions ? "Hide" : "Show all"} options
        </CollapseButton>
        </div>
        {openOptions && (
          <Fade fadeKey={question} fadeDuration={0.2}>
            <div className="ml-1">
              {allOptions.map((o: Option) => {
                return (
                  <div className="flex flex-row items-center space-x-2">
                    <Checkbox
                      checked={o.selected}
                      color={is_met ? "green" : "red"}
                    />

                    <p className="text-gray-500">
                      <span className="font-semibold">({o.key})</span> {o.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </Fade>
        )}
      </div>
    </div>
  );
};

export default QuestionAndOptions;

import { Option } from "@/interfaces/PriorAuth";
import React, { useState } from "react";
import CollapseButton from "../../design/CollapseButton";
import Fade from "../../animations/Fade";

const NextLogic = ({
  selectedOptions,
  next_step,
  next_logic,
}: {
  selectedOptions: Option[];
  next_step: string;
  next_logic: string;
}) => {
    const [openLogic, setOpenLogic] = useState<boolean>(false);
  return (
    <div>
      <div className="text-xl mt-4 mb-3 font-semibold">
        Option{selectedOptions.length > 1 && "s"}{" "}
        {selectedOptions.map((o, index) => (
          <span>
            {o.key}
            {index < selectedOptions.length - 2
              ? ", "
              : `${index < selectedOptions.length - 1 ? ", and " : ""}`}
          </span>
        ))}{" "}
        {selectedOptions.length > 1 ? "have" : "has"} been selected, therefore
        the next step is question {next_step}
      </div>
      <CollapseButton onClick={()=>setOpenLogic(!openLogic)}>
        <p className="">{openLogic ? "Hide" : "Show"} logic</p>
      </CollapseButton>
      {
        openLogic && 
        <Fade fadeKey={next_logic}>
            <div className="mt-1">
                <p className="text-gray-500 text-sm">
                    {next_logic}
                </p>
            </div>
        </Fade>
      }
    </div>
  );
};

export default NextLogic;

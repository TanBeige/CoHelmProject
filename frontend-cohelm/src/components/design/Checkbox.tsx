import React from "react";
import { BiCheck } from "react-icons/bi";
import Fade from "../animations/Fade";

const Checkbox = ({ checked,  color = "green" }: { checked: boolean, color: string }) => {
  return (
    <div
      className={`transition-colors w-5 h-5 flex justify-center items-center border-2 group border-${color}-500 ${
        checked ? `bg-${color}-500` : "bg-white"
      } rounded cursor-pointer`}
    >
      {checked && (
        <div className="w-5 h-5">
          <Fade fadeKey={"checkbox-check"}>
            <BiCheck className="transition-transform w-5 h-5 text-white group-hover:scale-[1.04]" />
          </Fade>
        </div>
      )}
    </div>
  );
};

export default Checkbox;

import React from 'react'
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import { FaLongArrowAltRight } from 'react-icons/fa';

interface SinglePathProps {
    pathKey: string;
    is_met: boolean;
    is_final: boolean;
}

const SinglePath = ({pathKey, is_met, is_final}: SinglePathProps) => {
  return (
    <div
      className="flex flex-row items-center space-x-1"
    >
      <div
        className={`relative transition-colors group cursor-pointer hover:bg-green-500 ${
          is_met ? "hover:bg-green-500" : "hover:bg-red-500"
        } rounded-lg px-2 py-1`}
      >
        <p className="text-gray-500 text-sm group-hover:text-white">
          {parseInt(pathKey) + 1}
        </p>
        <div className="-mt-3 ml-1.5">
          {is_met ? (
            <BiCheckCircle className="w-6 h-6 text-green-500 group-hover:text-white" />
          ) : (
            <BiXCircle className="w-6 h-6 text-red-500 group-hover:text-white" />
          )}
        </div>
      </div>
      {!is_final && <FaLongArrowAltRight />}
    </div>
  );
}

export default SinglePath
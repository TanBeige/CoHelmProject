import Dropzone from "@/components/SinglePrior/Dropzone";
import React from "react";

const DropzoneSection = ({
  title,
  description,
  onFileUpload,
  file
}: {
  title: string;
  description: string;
  onFileUpload: (file: File)=>void;
  file: File | null
}) => {
  return (
    <div>
      <div className="mb-2">
        <p className="text-lg font-semibold ">{title}<span className={`${!file ? "text-red-500" : ""}`}>*</span></p>
        <p className="text-gray-500 text-sm">{description}</p>
      </div>
      <div>
        <Dropzone onFileUpload={onFileUpload}/>
      </div>
    </div>
  );
};

export default DropzoneSection;

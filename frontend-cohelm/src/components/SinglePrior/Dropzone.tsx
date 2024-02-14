import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FiFile, FiFilePlus } from "react-icons/fi";

type Props = {
  onFileUpload: (file: File) => void;
};

const Dropzone = ({ onFileUpload }: Props) => {
  const onDrop = useCallback((acceptedFiles: any) => {
    // Do something with the files
    onFileUpload(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`transition-all cursor-pointer w-full border-2 border-dashed p-4 rounded-lg hover:opacity-60 ${
        isDragActive ? "opacity-60" : "opacity-100"
      } bg-gray-400/10`}
    >
      <div className="flex justify-center items-center h-full">
        <input {...getInputProps()} />
        <div
          className={`flex flex-col justify-center text-center text-gray-500`}
        >
          <div className="text-center w-full justify-center">
            {acceptedFiles.length > 0 ? (
              <FiFile className="w-20 h-20 mx-auto" />
            ) : (
              <FiFilePlus className="w-20 h-20 mx-auto" />
            )}
          </div>
          {acceptedFiles.length > 0 ? (
            <div>
              <p className="text-center text-sm mt-2">
                {acceptedFiles?.[0]?.name}
              </p>

              <p className="text-center text-sm text-blue-400">
                Click or drag a file here to change
              </p>
            </div>
          ) : (
            <div>
              <p className="text-center text-sm mt-2">
              Drag 'n' drop the file here
            </p>

              <p className="text-center text-sm">
              or click to select the file
              </p>
            </div>
            
          )}
        </div>
      </div>
    </div>
  );
};

export default Dropzone;

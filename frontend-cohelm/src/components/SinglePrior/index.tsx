"use client";

import React, { useContext, useEffect, useState } from "react";
import Button from "../design/Button";
import Header from "../design/header";
import { io } from "socket.io-client";
import DropzoneSection from "./DropzoneSection";
import SubmittingAnimation from "./SubmittingAnimation";
import Fade from "../animations/Fade";
import { AppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/utils/consts";
import { PriorAuthPromise } from "@/interfaces/PriorAuth";

const SinglePrior = () => {
  const router = useRouter();

  const { priorAuths, setPriorAuths } = useContext(AppContext);

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitLabel, setSubmitLabel] = useState<string>("");

  const [medicalRecord, setMedicalRecord] = useState<File | null>(null);
  const [guideline, setGuideline] = useState<File | null>(null);
  const [isError, setIsError] = useState<boolean>(false);

  const handleMedicalRecord = (file: File) => {
    setMedicalRecord(file);
  };
  const handleGuideline = (file: File) => {
    setGuideline(file);
  };

  const handleSubmit = () => {
    if (!medicalRecord || !guideline) {
      setIsError(true);
      return;
    }
    setSubmitting(true);
  };

  useEffect(() => {
    const socket = io(`${BACKEND_URL}/process`);

    if (submitting) {
      socket.emit("start_process", "begin");
      socket.on("process_update", (update) => {
        setSubmitLabel(update.message);
      });
      socket.on("process_completed", (update: PriorAuthPromise) => {
        const updatedPriorAuth = update?.data;

        // Append to end, using last item as index for this project
        const priorAuthsList = (priorAuths || []).concat([updatedPriorAuth]);
        setPriorAuths(priorAuthsList);
        router.push(`/prior-auth/${priorAuthsList.length - 1}`);
      });
    }
    return () => {
      if (submitting) {
        socket.off("process_update");
      }
    };
  }, [submitting]);

  const renderSubmitting = () => {
    return (
      <Fade fadeKey={"submit-animation"} fadeDuration={0.2}>
        <div className="min-h-[40vh] flex justify-center items-center">
          <SubmittingAnimation label={submitLabel} />
        </div>
      </Fade>
    );
  };

  const renderFileUpload = () => {
    return (
      <Fade fadeKey={"file-upload"} fadeDuration={0.1}>
        <div className="flex flex-col space-y-12">
          <div>
            <DropzoneSection
              title="Upload Medical Record"
              description="Upload a PDF of the medical record."
              onFileUpload={handleMedicalRecord}
              file={medicalRecord}
            />
            {isError && !medicalRecord && (
              <p className="text-red-500 mt-1">Medical Record PDF required*</p>
            )}
          </div>
          <div>
            <DropzoneSection
              title="Upload Guideline"
              description="Upload a PDF of the guidelines applied to the record."
              onFileUpload={handleGuideline}
              file={guideline}
            />
            {isError && !guideline && (
              <p className="text-red-500 mt-1">Guideline PDF required*</p>
            )}
          </div>

          <div>
            <Button onClick={handleSubmit} className="w-full">
              Submit Files
            </Button>
          </div>
        </div>
      </Fade>
    );
  };

  return (
    <div>
      <Header title="Create Prior Auth" />

      {submitting ? renderSubmitting() : renderFileUpload()}
    </div>
  );
};

export default SinglePrior;

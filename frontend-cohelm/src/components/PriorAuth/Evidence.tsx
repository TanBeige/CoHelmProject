import { Evidence } from "@/interfaces/PriorAuth";
import React, { useState } from "react";
import { GoLightBulb } from "react-icons/go";
import Badge from "../design/Badge";
import Fade from "../animations/Fade";

interface EvidenceProps {
  evidence: Evidence[];
}

const Evidence = ({ evidence }: EvidenceProps) => {
  const [openEvidence, setOPenEvidence] = useState<boolean>(false);
  return (
    <div>
      <div
        className={`flex flex-row items-center space-x-2 bg-gray-50 p-4 rounded-t-lg ${
          !openEvidence && "rounded-b-lg"
        } border`}
      >
        <GoLightBulb className="w-8 h-8" />
        <div>
          <p className="text-lg font-semibold">
            This decision was made based on citations from the medical record.
          </p>
          <div>
            <p
              onClick={() => setOPenEvidence(!openEvidence)}
              className="inline-block transition-colors text-sm text-gray-500 py-1 px-1 cursor-pointer hover:bg-gray-100 select-none"
            >
              {openEvidence ? "Hide" : "Show"} evidence
            </p>
          </div>
        </div>
      </div>
      {openEvidence && (
        <Fade fadeKey={`evidence-list`} fadeDuration={0.2}>
          <div className="w-full border border-t-0 rounded-b">
            <table className="w-full divide-y divide-gray-300 text-wrap">
              <thead className="w-full">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                  >
                    Page
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Evidence
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white w-full rounded-b-md">
                {evidence.map((ev) => (
                  <tr key={`${ev.event_datetime}`} className="odd:bg-gray-50">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                      <div className="">
                        <Badge label={`Page ${ev.page_number}`} />
                      </div>
                    </td>
                    <td className=" text-wrap px-3 py-4 text-sm text-gray-500">
                      {ev.content}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Fade>
      )}
    </div>
  );
};

export default Evidence;

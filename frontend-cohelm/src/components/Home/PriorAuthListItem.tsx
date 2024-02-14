import { PriorAuth } from "@/interfaces/PriorAuth";
import React from "react";
import Badge from "../design/Badge";
import Link from "next/link";
import IsMetBadge from "../design/IsMetBadge";

const PriorAuthListItem = ({ item, id }: { item: PriorAuth; id: number }) => {
  return (
    <Link href={`/prior-auth/${id}`}>
      <div className="transition-colors border rounded-lg p-4 hover:bg-blue-500/10">
        <div className="flex flex-row items-center space-x-2 mb-2">
          <p className="mb-1 text-lg">{item.procedure_name}</p>
          <Badge label={item.case_id} />
          <IsMetBadge is_met={item.is_met}/>
        </div>

        <div className="line-clamp-2 text-sm text-gray-500">{item.summary}</div>
      </div>
    </Link>
  );
};

export default PriorAuthListItem;

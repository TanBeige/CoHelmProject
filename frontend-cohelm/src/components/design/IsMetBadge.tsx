import React from "react";
import Badge from "./Badge";

const IsMetBadge = ({ is_met }: { is_met: boolean }) => {
  return (
    <Badge
      label={is_met ? "Probably Acceptance" : "Probably Denial"}
      color={is_met ? "green" : "red"}
    />
  );
};

export default IsMetBadge;

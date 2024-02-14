"use client";
import React, { useContext, useEffect, useState } from "react";
import { ImFilesEmpty } from "react-icons/im";
import Button from "../design/Button";
import Link from "next/link";
import Image from "next/image";
import Header from "../design/header";
import { AppContext } from "@/context/AppContext";
import NoPriorAuthsFound from "./NoPriorAuthsFound";
import { PriorAuth } from "@/interfaces/PriorAuth";
import PriorAuthListItem from "./PriorAuthListItem";
import LoadingCircle from "../design/LoadingCircle";

type Props = {};

const Home = (props: Props) => {
  const { priorAuths } = useContext(AppContext);

  const [allPriors, setAllPriors] = useState<PriorAuth[] | null>(null);

  useEffect(() => {
    // Normally you would use the API to set loading, but with localstorage this is the best way to handle it without hydration issues
    if (priorAuths !== null) {
      setAllPriors(priorAuths);
    }
  }, [priorAuths]);

  const renderContent = () => {
    if (allPriors === null) {
      return (
        <div className="w-20 h-20 mx-auto mt-32">
          <LoadingCircle />
        </div>
      );
    }
    if (allPriors && allPriors?.length > 0) {
      return (
        <div>
          <div className="flex flex-col space-y-3">
            {allPriors.map((item, index) => (
              <PriorAuthListItem item={item} id={index} />
            ))}
          </div>
        </div>
      );
    } else {
      return <NoPriorAuthsFound />;
    }
  };

  return (
    <div>
      <Header title="Your Prior Auths" />

      {renderContent()}
    </div>
  );
};

export default Home;

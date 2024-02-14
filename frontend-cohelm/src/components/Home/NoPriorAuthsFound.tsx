import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "../design/Button";

type Props = {};

const NoPriorAuthsFound = (props: Props) => {
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-[55vh]">
      <div className="w-32 h-32 relative">
        <Image
          alt="logo"
          src="/images/no-connection.png"
          layout="fill"
          className="object-contain drop-shadow-lg"
        />
      </div>
      <div className="mt-4">
        <p className="text-2xl font-semibold">No prior auths found</p>
        <div className="flex justify-center mt-3">
          <Link href={"/single-prior"}>
            <Button>Create Prior Auth</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoPriorAuthsFound;

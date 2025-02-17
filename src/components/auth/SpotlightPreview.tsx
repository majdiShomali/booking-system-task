import React from "react";
import { Spotlight } from "./spotlight";
import infoConstants from "@/constants/info.constants";

export function SpotlightPreview() {

  return (
    <div className="h-full w-full rounded-md flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="h-fit py-5 text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          {infoConstants.info.name} <br />.
        </h1>
        <p className="mt-4 font-normal text-base max-w-lg text-center mx-auto">
         {infoConstants.info.description}
        </p>
      </div>
    </div>
  );
}

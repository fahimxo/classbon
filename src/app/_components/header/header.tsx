import Image from "next/image";
import React from "react";
import TopNavigation from "./top-navigation";
import dynamic from "next/dynamic";
const HeaderUserSection = dynamic(() => import("./header-user-section"), {
  ssr: false,
});

export const Header = async () => {
  return (
    <header className="border-b dark:border-base-content dark:border-opacity-5">
      <div className="container flex justify-between items-center">
        <Image
          src={"/images/logo-light.svg"}
          width={100}
          height={36}
          alt="classbon"
        />
        <TopNavigation />
        <span className="mr-auto">
          <HeaderUserSection />
        </span>
      </div>
    </header>
  );
};

import Image from "next/image";
import React from "react";
import { Button } from "../button";
import { IconArrowLeftFill } from "../icons/icons";

const HomeHeroSection: React.FC = () => {
  return (
    <>
      <section className="bg-hero-pattern bg-no-repeat bg-center mt-5 xl:mt-20 xl:bg-left">
        <div className="container flex flex-col-reverse items-center lg:flex-row">
          <div className="flex flex-col gap-5 mt-12 pb-5 text-center xl:text-right">
            <h3 className="text-xl text-info xl:text-2xl">خوش اومدی به...</h3>
            <h1 className="text-3xl font-black gradient lg:text-3xl xl:text-5xl">
              مسیر صعود به قله های برنامه نویسی
            </h1>
            <p className="text-lg font-bold leading-8">
              هر جای مسیر برنامه نویسی که باشی،با همراهی استاد های با تجربه
              کلاسبن می تونی بدون محدودیت به قله های بالاتر صعود کنی. ما همیشه
              هواتو داریم
            </p>
            <div className="flex my-5 gap-4 justify-center xl:justify-start">
              <Button variant="primary" size="large">
                دوره های ریکت و نکست
                <IconArrowLeftFill fill="currentColor" />
              </Button>
              <Button variant="neutral" size="large">
                مشاوره برنامه نویسی
              </Button>
            </div>
            <Image
              src={"/images/frameworks.png"}
              width={412}
              height={39}
              alt="frameworks"
              className="grayscale opacity-70 mt-4 mx-auto lg:m-0"
            />
          </div>
          <Image
            src={"/images/programmer-landing.svg"}
            width={702}
            height={521}
            alt="classbon"
            className=" mt-4 mx-auto lg:m-0"
          />
        </div>
      </section>
    </>
  );
};

export default HomeHeroSection;

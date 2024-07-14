import { Badge } from "@/app/_components/badge";
import { IconArrowLeftFill, IconClock } from "@/app/_components/icons/icons";
import { Price } from "@/app/_components/price";
import { CourseSummary } from "@/types/course-summery.interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";
type CourseCardProps = CourseSummary & {};

const CourseCard: React.FC<CourseCardProps> = ({
  coverImageId,
  title,
  subTitle,
  slug,
  recordStatus,
  level,
  basePrice,
  duration,
}: CourseCardProps) => {
  return (
    <div className="card">
      <figure>
        <Image
          src={`https://api.classbon.com/api/picture/${coverImageId}`}
          alt={title}
          width={550}
          height={327}
        />
      </figure>
      <div
        className="flex justify-between items-center mt-2 gap-2 font-semibold
       dark:text-info px-3 py-2"
      >
        <Badge variant="info">{recordStatus}</Badge>
        <Badge variant="accent">{level}</Badge>
      </div>
      <div className="card-body">
        <Link
          className="text-lg text-white font-bold"
          href={`/courses/${slug}`}
        >
          {title}
        </Link>
        <p>{subTitle}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="inline-flex justify-center items-center">
            <Badge variant="warning">
              <IconClock width={16} height={16} />
              <span className="leading-none">{duration}</span>
            </Badge>
          </span>
          <Price price={basePrice} size="tiny" />
        </div>
        <Link
          href={`/courses/${slug}`}
          className="card-footer justify-center animated-icon"
        >
          مشاهده جزییات دوره
          <IconArrowLeftFill fill="currentColor" />
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;

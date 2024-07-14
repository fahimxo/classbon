import { CourseSummary } from "@/types/course-summery.interface";
import React from "react";
import CourseCard from "./course-card";
import { API_URL } from "@/configs/global";

async function getNewestCourses(count: number): Promise<CourseSummary[]> {
  await new Promise((r) => setTimeout(r, 5000));
  const res = await fetch(`${API_URL}/courses/newest/${count}`, {
    cache: "no-store",
    next: {
      revalidate: 60 * 60 * 24,
    },
  });
  return res.json();
}

type CoursesCardListProps = {
  courses: CourseSummary[];
};

const CoursesCardList: React.FC<CoursesCardListProps> = async ({
  courses,
}: CoursesCardListProps) => {
  const newestCourses = await getNewestCourses(4);
  return (
    <div className="flex flex-wrap justify-center xl:justify-start gap-6 mt-10">
      {newestCourses.map((course) => (
        <CourseCard key={`course-${course.slug}`} {...course} />
      ))}
    </div>
  );
};

export default CoursesCardList;

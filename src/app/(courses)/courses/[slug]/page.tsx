import { API_URL } from "@/configs/global";
import { CourseDetails } from "@/types/course-details.interface";
import React from "react";
import CourseAside from "./_components/course-aside/course-aside";
import Tabs from "@/app/_components/tabs";
import Accordion from "@/app/_components/accordion";
import { AccordionType } from "@/types/accordion.types";
import CourseComments from "./_components/comments/course-comments";
import CourseCurriculum from "./_components/curriculum";
import { CourseChapter } from "@/types/course-chapter.interface";
import { VideoPlayer } from "@/app/_components/video-player";
import Image from "next/image";

export async function generateStaticParams() {
  const slugs = await fetch(`${API_URL}/courses/slugs`).then((res) =>
    res.json()
  );
  return (slugs as string[]).map((slug) => ({
    slug: slug,
  }));
}

const getCourse = async (slug: string): Promise<CourseDetails> => {
  const data = await fetch(`${API_URL}/courses/${slug}`);
  return data.json();
};

const getCurriculum = async (slug: string): Promise<CourseChapter[]> => {
  const data = await fetch(`${API_URL}/courses/${slug}/curriculum`);
  return data.json();
};

async function CourseDeatails({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const courseData = getCourse(slug);
  const curseCurriculumData = getCurriculum(slug);

  const [course, curseCurriculum] = await Promise.all([
    courseData,
    curseCurriculumData,
  ]);

  const faqs: AccordionType[] = course.frequentlyAskedQuestions.map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: faq.answer,
  }));

  const tabs = [
    {
      label: "مشخصات دوره",
      content: course.description,
    },
    {
      label: "دیدگاه ها و پرسش",
      content: <CourseComments />,
    },
    {
      label: "سوالات متداول",
      content: <Accordion data={faqs} />,
    },
  ];

  return (
    <div className="container grid grid-cols-10 grid-rows-[1fr 1fr] gap-10 py-10">
      <div className="bg-primary pointer-events-none absolute left-1/2 aspect-square w-1/2 -translate-x-1/2 -top-96 rounded-full opacity-10 blur-3xl"></div>
      <div className="col-span-10 xl:col-span-7 ">
        <h1 className="text-center xl:text-right text-2xl lg:text-3xl xl:text-4xl font-black leading-10">
          {course.title}
        </h1>
        <h2 className="mt-4 text-center xl:text-right text-lg leading-9">
          {course.subTitle}
        </h2>
        <div className="mt-5">
          {course.videoUrl ? (
            <VideoPlayer
              src={course.videoUrl}
              poster={`${API_URL}/picture/${course.coverImageId}`}
            />
          ) : (
            <Image
              src={`${API_URL}/picture/${course.coverImageId}`}
              width={550}
              height={327}
              alt={course.title}
              className="w-full"
            />
          )}
        </div>
      </div>
      <div className="col-span-10 xl:col-span-3 ">
        <CourseAside {...course} />
      </div>
      <div className="col-span-10 xl:col-span-6 ">
        <Tabs tabs={tabs} />
      </div>
      <div className="col-span-10 xl:col-span-4 ">
        <div className="sticky top-5">
          <h2 className="mb-5 text-xl">سرفصل های دوره</h2>
          <CourseCurriculum data={curseCurriculum} />
        </div>
      </div>
    </div>
  );
}

export default CourseDeatails;

"use client";
import Comment from "@/app/_components/comment";
import { useCourseComments } from "../../_api/get-comments";
import { useParams } from "next/navigation";
import { TextPlaceholder } from "@/app/_components/placeholder";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Alert from "@/app/_components/alert";
import { Button } from "@/app/_components/button";
import { IconRefresh } from "@/app/_components/icons/icons";

const CourseComments = () => {
  const { slug } = useParams();
  const { ref, inView } = useInView({});

  const { data, fetchNextPage, hasNextPage, isFetching, refetch, error } =
    useCourseComments({
      params: {
        page: 1,
        slug: slug as string,
      },
    });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  if (error) {
    return (
      <>
        <Alert variant="error">خطا در برقراری ارتباط با سرور</Alert>
        <div className="text-center mt-3">
          <Button
            variant="neutral"
            className="font-semibold"
            isOutline={true}
            shape="wide"
            onClick={() => refetch()}
          >
            <IconRefresh />
            تلاش مجدد
          </Button>
        </div>
      </>
    );
  }

  return (
    <div>
      {data?.pages?.map((page) => (
        <Fragment key={`comment-page-${page.nextPage}`}>
          {page.data.map((comment) => (
            <Comment
              key={`comment-${comment.id}`}
              variant="info"
              {...comment}
            />
          ))}
        </Fragment>
      ))}
      {(isFetching || hasNextPage) && (
        <div ref={ref}>
          <TextPlaceholder />
        </div>
      )}
    </div>
  );
};

export default CourseComments;

import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { CourseCommentsList } from "../_types/course-comments.interface";
import { readData } from "@/core/http-service/http-service";

type GetCommentsOptions = {
  params: {
    slug: string;
    page: number;
  };
};

const getComments = ({
  params,
}: GetCommentsOptions): Promise<CourseCommentsList> => {
  const { slug, page } = params;
  const url = `/courses/${slug}/comments?page=${page}`;
  return readData(url);
};

export const useCourseComments = ({ params }: GetCommentsOptions) => {
  const { data, fetchNextPage, hasNextPage, refetch, isFetching, error } =
    useInfiniteQuery({
      queryKey: ["courseComments", params.slug],
      queryFn: ({ pageParam }) =>
        getComments({
          params: {
            ...params,
            page: pageParam,
          },
        }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      staleTime: 1000 * 60 * 60 * 5,
      gcTime: 1000 * 60 * 60 * 6,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetching,
    error,
  };
};

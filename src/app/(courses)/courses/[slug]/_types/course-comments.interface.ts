import { Comment } from "@/types/comment.interface";

export interface CourseCommentsList {
  data: Comment[];
  nextPage: number;
}

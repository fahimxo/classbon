export interface Comment {
  id: number;
  date: string;
  userId: number;
  fullName: string;
  commentText: string;
  score: number | null;
  isResponse: boolean;
}

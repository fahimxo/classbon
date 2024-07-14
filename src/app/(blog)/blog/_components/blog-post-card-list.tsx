import React from "react";
import BlogPostCard from "./blog-post-card";
import { BlogPostSummery } from "@/types/blog-post-summery.interface";

type BlogPostCardListProps = {
  blogs: BlogPostSummery[];
};

const BlogPostCardList: React.FC<BlogPostCardListProps> = ({
  blogs,
}: BlogPostCardListProps) => {
  return (
    <div className="flex flex-wrap justify-center xl:justify-start gap-6 mt-10">
      {blogs.map((blog) => (
        <BlogPostCard key={`course-${blog.slug}`} {...blog} />
      ))}
    </div>
  );
};

export default BlogPostCardList;

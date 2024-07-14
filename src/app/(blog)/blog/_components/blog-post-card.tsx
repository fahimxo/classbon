import { Badge } from "@/app/_components/badge";
import {
  IconCalendar,
  IconClock,
  IconComment,
  IconEye,
  IconUserProfile,
} from "@/app/_components/icons/icons";
import { BlogPostSummery } from "@/types/blog-post-summery.interface";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogPostCard: React.FC<BlogPostSummery> = ({
  author,
  numberOfComments,
  slug,
  numberOfViews,
  postDate,
  studyTime,
  thumbnailUrl,
  title,
}) => {
  return (
    <div className="card">
      <figure>
        <Image
          src={thumbnailUrl}
          className=""
          width={550}
          height={327}
          alt={title}
        />
      </figure>
      <div className="card-body">
        <Link href={`/blog/${slug}`} className="card-title mb-auto">
          {title}
        </Link>
        <div className="flex items-center justify-between mt-2">
          <Badge variant="info" size="tiny">
            <IconUserProfile width={16} height={16} />
            {author}
          </Badge>
          <Badge variant="neutral" className="flex items-center">
            <IconCalendar width={16} height={16} />
            <span>{postDate}</span>
          </Badge>
        </div>
      </div>
      <div className="card-footer text-xs justify-between">
        <div className="flex gap-1">
          <Badge variant="warning">
            <IconEye width={16} height={16} />
            {numberOfViews}
          </Badge>
          <Badge variant="accent">
            <IconComment width={16} height={16} />
            {numberOfComments}
          </Badge>
        </div>
        <span className="flex items-center gap-1">
          <IconClock width={16} height={16} />
          زمان مطالعه : {studyTime} دقیقه
        </span>
      </div>
    </div>
  );
};

export default BlogPostCard;

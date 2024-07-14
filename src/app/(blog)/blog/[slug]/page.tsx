import React from "react";

function BlogDeatails({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return <div>{slug}</div>;
}

export default BlogDeatails;

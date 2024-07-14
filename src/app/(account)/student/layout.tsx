import React, { ReactNode } from "react";

async function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <aside className="flex bg-gray-200 justify-center items-center w-80">
        aside
      </aside>
      <main>{children}</main>
    </>
  );
}

export default StudentLayout;

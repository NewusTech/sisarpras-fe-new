"use client";

import { BreadcrumbSetItem } from "@/components/shared/layouts/myBreadcrumb";
import React from "react";

export default function Page() {
  return (
    <div>
      <BreadcrumbSetItem
        items={[
          {
            title: "Dashboard",
          },
        ]}
      />
      pageeeee Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Consectetur aliquid quas, nulla quam dolores at? Unde, voluptates
      asperiores. Eaque rerum accusamus ea aspernatur ipsam ipsum sapiente. Quod
      est enim excepturi!
    </div>
  );
}

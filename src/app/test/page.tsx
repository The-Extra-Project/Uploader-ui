"use client";

import React from "react";
import { useSession } from "next-auth/react";

export default function Page() {
  // const { data: session } = useSession()

  return (
    <div>
      <h1>user:</h1>
      <code>{/* <pre>{JSON.stringify(session, null, 2)}</pre> */}</code>
    </div>
  );
}

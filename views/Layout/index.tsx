import { useUser } from "context/userContext";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const {
    user: { uid },
  } = useUser();
  if (uid) return <div>{children}</div>;
  return <div>Log in</div>;
}

import React, { ReactNode } from "react";

const GuestGuard = async ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default GuestGuard;

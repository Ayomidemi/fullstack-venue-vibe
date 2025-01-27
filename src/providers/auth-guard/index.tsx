import { ISession } from "@/interface";
import React, { ReactNode } from "react";
// import { NotificationProvider } from "../notification-provider";
import { LogInAuthCheck } from "./log-in-auth-check";
import { getSession } from "@/actions-server/auth";
import { redirect } from "next/navigation";

const AuthGuard = async ({ children }: { children: ReactNode }) => {
  const session: ISession = await getSession();

  if (!session.isLoggedIn) {
    redirect("/login");
  }

  return (
    <div>
      <LogInAuthCheck forceLogIn={!session.isLoggedIn} />
      {children}
    </div>
  );
};

export default AuthGuard;

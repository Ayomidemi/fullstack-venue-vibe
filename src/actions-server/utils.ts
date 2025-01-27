"use server";

import { ISession } from "@/interface";
import { getSession } from "./auth";

export const fetchFromServer = async (
  endpoint: string,
  options: RequestInit = {},
  guest?: boolean
) => {
  const session: ISession = await getSession();

  if (!guest && !session?.token?.token) {
    return { error: "unautorised", status: 401 };
  }
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        "Surrogate-Control": "no-store",
        Authorization: `Bearer ${session?.token?.token}`,
        ...options.headers,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      return data;
    }

    return data;
  } catch (error) {
    return error;
  }
};

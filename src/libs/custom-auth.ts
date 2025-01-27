import { ISession } from "@/interface";
import { SessionOptions } from "iron-session";

export const defaultSession: ISession = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  password: process.env.SECRET_KEY || "",
  cookieName: "__sez",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.ENVIRONMENT === "production",
  },
};

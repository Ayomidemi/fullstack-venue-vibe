"use server";

import { fetchFromServer } from "../utils";

export const getEndpoint = async () => {
  return fetchFromServer("", {}, true);
};

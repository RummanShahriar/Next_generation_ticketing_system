import { createContext } from "react";

export const UserToken = createContext({
  authorised: "false",
  setAuthorised: (value: string) => {},
  userId: "",
  setUserId: (value: string) => {},
  userType: "",
  setUserType: (value: string) => {},
});

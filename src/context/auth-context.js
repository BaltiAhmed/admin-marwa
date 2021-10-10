import { createContext } from "react";

export const Authcontext = createContext({
  userId: null,
  user:null,
  token: null,
  login: () => {},
  logout: () => {}
});

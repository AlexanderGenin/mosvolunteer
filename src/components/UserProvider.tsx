import type { FC } from "react";
import React from "react";
import type { UserContextProps } from "./UserContext";
import { UserContext } from "./UserContext";

const UserProvider: FC<UserContextProps> = ({ user, children }) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export default UserProvider;

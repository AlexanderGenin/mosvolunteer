import React from "react";

import { UserContext } from "./UserContext";

const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw Error("The UserContext context is null.");
  }
  return context;
};

export default useUser;

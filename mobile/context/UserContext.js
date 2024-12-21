import React, { createContext, useState } from "react";
import { USER_ID } from "../app/utils/utils";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState("0965507781");
  const [bonus, setBonus] = useState(50);
  const [name, setName] = useState("Andrey");
  const [password, setPassword] = useState("12342345");
  const [id, setId] = useState(USER_ID);

  return (
    <UserContext.Provider value={{ phoneNumber, setPhoneNumber, bonus, setBonus, name, password, id, setId, setPassword, setName }}>
      {children}
    </UserContext.Provider>
  );
};

import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState("0965507781");
  const [bonus, setBonus] = useState(50);
  const [name, setName] = useState("Andrey");
  const [password, setPassword] = useState("12342345");
  const [id, setId] = useState("67433e5295a376bc33899a09");

  return (
    <UserContext.Provider value={{ phoneNumber, setPhoneNumber, bonus, setBonus, name, password, id, setId, setPassword, setName }}>
      {children}
    </UserContext.Provider>
  );
};

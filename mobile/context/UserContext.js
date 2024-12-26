import React, { createContext, useState, useEffect } from "react";
import { USER_ID, BASE_URL } from "../app/utils/utils";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState("0965507781");
  const [bonus, setBonus] = useState(50);
  const [name, setName] = useState("Andrey");
  const [password, setPassword] = useState("12342345");
  const [id, setId] = useState(USER_ID);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/clients/${id}`);
        if (!response.ok) {
          throw new Error('Помилка завантаження даних клієнта');
        }
        const data = await response.json();
        setBonus(data.bonusPoints);
      } catch (error) {
        Alert.alert('Помилка', error.message);
      }
    };

    fetchClientData();
  }, [id]);

  return (
    <UserContext.Provider value={{ phoneNumber, setPhoneNumber, bonus, setBonus, name, password, id, setId, setPassword, setName }}>
      {children}
    </UserContext.Provider>
  );
};

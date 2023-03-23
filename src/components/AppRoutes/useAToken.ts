import { useState } from "react";

export default function useAToken() {
  const getToken = () => {
    const accessToken = localStorage.getItem("Authorization");
    return accessToken;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (token: string) => {
    localStorage.setItem("Authorization", token);
    setToken(token);
  };

  return {
    token,
    setToken: saveToken,
  };
}

import { AuthContext } from "@/context/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function AuthProvider ({ children }) {
  const router = useRouter();
  const [ loggedInUser, setLoggedInUser ] =  useState(null);
  
  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("loggedInUser")));
    return () => {
      setLoggedInUser(null);
    }
  }, [router.pathname]);

  return (
    <AuthContext value={loggedInUser}>
      { children }
    </AuthContext>
  );
}
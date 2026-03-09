import { BACKEND_URL as backend_url } from "@/config/env";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Logout() {
  const router = useRouter();
  const [logOutStatus, setLogOutStatus] = useState("loading");
  
  useEffect(() => {
    const requestLogout = async () => {
      try {
        const response = await fetch(`${backend_url}/api/auth/logout`, {
          method: "GET",
          credentials: "include"
        });
        const data = await response.json();
        if (data.success) {
          setLogOutStatus("done");
          localStorage.removeItem("loggedInUser");
          setTimeout(() => {
            router.replace("/");
          }, 1000);
        } else {
          setLogOutStatus("error");
        }
      } catch (err) {
        console.error(err);
        setLogOutStatus("error");
      }
    };
    requestLogout();
  }, []);

  return (
    <>
    {
      (logOutStatus === "loading") ?
      "Loading..." :
      (logOutStatus === "done") ?
      "You have been logged out. Redirecting..." :
      "Something went wrong"
    }
    </>
  );
}
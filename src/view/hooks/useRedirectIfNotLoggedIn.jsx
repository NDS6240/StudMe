import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthUser from "./useAuthUser";

const useRedirectIfNotLoggedIn = () => {
  const user = useAuthUser();
  const navigate = useNavigate();

  useEffect(() => {
    //If user is null, redirect to login page
    if (user === null) {
      navigate("/login");
    }
  }, [user, navigate]);
};
export default useRedirectIfNotLoggedIn;

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuthUser = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    // Subscribes to Firebase authentication state changes
    // Updates local user state when the auth status changes
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  return user;
};

export default useAuthUser;

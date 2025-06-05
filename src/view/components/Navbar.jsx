import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import useAuthUser from "../hooks/useAuthUser";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Navbar = () => {
  // Custom hook to get the current authenticated user
  const user = useAuthUser();
  const [isAdmin, setIsAdmin] = useState(false);

  // Used to redirect user after logout
  const navigate = useNavigate();

  // Fetch the user's role from Firestore if logged in
  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) return;
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setIsAdmin(snap.data().isAdmin === true);
      }
    };
    fetchUserRole();
  }, [user]);

  if (user === undefined) return null;

  // Signs the user out and refreshes the page
  const handleLogout = () => {
    getAuth()
      .signOut()
      .then(() => {
        navigate("/");
        window.location.reload();
      });
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src="/Logo.png" alt="StudMe Logo" className={styles.logo} />
        <h1>StudMe</h1>
        <ul>
          {/* Checks user name to welcome or display signin and signup buttons */}
          {user ? (
            <>
              <li>Hello, {user?.displayName || user?.email || "Guest"}!</li>
              <li>
                <button className={styles.navLink} onClick={handleLogout}>
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signUp">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* Show admin dashboard link only if user is admin */}
        {isAdmin && (
          <li>
            <Link to="/admin">Admin Dashboard</Link>
          </li>
        )}
        <li>
          <Link to="/new-task">New Task</Link>
        </li>
        <li>
          <Link to="/task-manager">Task Manager</Link>
        </li>
        <li>
          <Link to="/upload-summary">Upload Summary</Link>
        </li>
        <li>
          <Link to="/summary-library">Summaries Library</Link>
        </li>
        <li>
          <Link to="/ForumPage">Study Rooms</Link>
        </li>
        <li>
          <Link to="/help-&-settings">User Settings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

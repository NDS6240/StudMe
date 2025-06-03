import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import useAuthUser from "../hooks/useAuthUser";
import { getAuth } from "firebase/auth";

const Navbar = () => {
  // Custom hook to get the current authenticated user
  const user = useAuthUser();

  // Used to redirect user after logout
  const navigate = useNavigate();
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
        {user ? (
          <>
            <li>Hello, {user?.displayName || user?.email || "Guest"}</li>
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
      </div>

      <ul>
        <li>
          <Link to="/">Home Dashboard</Link>
        </li>
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
        <il>
          <Link to="ForumPage">Study Rooms</Link>
        </il>
        <li>
          <Link to="/help-&-settings">User Settings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

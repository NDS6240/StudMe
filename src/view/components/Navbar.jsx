import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src="/Logo.png" alt="StudMe Logo" className={styles.logo} />
        <h1>StudMe</h1>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
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
        <li>
          <Link to="/help-&-settings">Help & Settings</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;

import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <h1>EduSync</h1>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/admin">Admin Dashboard</Link>
        </li>
        <li>
          <Link to="/student">Student Dashboard</Link>
        </li>
        <li>
          <Link to="/new-task">New Task</Link>
        </li>
        <li>
          <Link to="/upload-summary">Upload Summary</Link>
        </li>
        <li>
          <Link to="/summary-library">Summaries Library</Link>
        </li>
        <li>
          <Link to="/task-manager">Task Manager</Link>
        </li>
        <li>
          <Link to="/help-&-settings">Help & Settings</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;

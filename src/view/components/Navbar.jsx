import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";


const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/student">Student</Link>
        </li>
        <li>
          <Link to="/new-task">New Task</Link>
        </li>
        <li>
          <Link to="/upload-summary">Upload Summary</Link>
        </li>
        <li>
          <Link to="/summary-library">Summary Library</Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;

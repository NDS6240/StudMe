import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import AdminUsers from "./AdminUsers";
import AdminForums from "./AdminForums";
import AdminSummaries from "./AdminSummaries";
import AdminStats from "./AdminStats";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
  const [section, setSection] = useState("summaries");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const user = getAuth().currentUser;

      if (!user) {
        navigate("/");
        return;
      }

      // Check Firestore if user is admin
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists() || !docSnap.data().isAdmin) {
        navigate("/");
      }
    };

    checkAdmin();
  }, [navigate]);

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>
      <nav className={styles.nav}>
        <button onClick={() => setSection("summaries")}>Summaries</button>
        <button onClick={() => setSection("users")}>Users</button>
        <button onClick={() => setSection("forums")}>Forums</button>
        <button onClick={() => setSection("stats")}>Stats</button>
      </nav>
      {section === "summaries" && <AdminSummaries />}
      {section === "users" && <AdminUsers />}
      {section === "forums" && <AdminForums />}
      {section === "stats" && <AdminStats />}
    </div>
  );
};

export default AdminDashboard;

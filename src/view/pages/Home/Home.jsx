import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import useRedirectIfNotLoggedIn from "../../hooks/useRedirectIfNotLoggedIn";

import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useRedirectIfNotLoggedIn();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      setLoading(true);
      const tasksSnap = await getDocs(
        query(collection(db, "tasks"), where("userId", "==", user.uid), limit(9))
      );
      const tasksData = tasksSnap.docs.map((doc) => doc.data());
      setTasks(tasksData);
      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1>Welcome to StudMe</h1>
        <p>
          Your academic companion – upload summaries, track tasks, and stay on
          top of your study life.
        </p>
        <Link to="/summary-library" className={styles.ctaButton}>
          Go to Library
        </Link>
      </section>

      <section className={styles.latestSection}>
        <h2>Tasks</h2>
        {loading ? (
          <div className={styles.grid}>
            {[...Array(3)].map((_, i) => (
              <div key={i} className={styles.skeletonCard}></div>
            ))}
          </div>
        ) : (
          <div className={styles.grid}>
            {tasks.map((task, i) => (
              <div
                key={i}
                className={`${styles.card} ${
                  styles[`priority_${task.priority?.toLowerCase()}`]
                }`}
              >
                <h3>{task.title}</h3>
                <p>
                  <strong>Course:</strong> {task.course}
                </p>
                <p>
                  <strong>Due:</strong> {task.dueDate}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
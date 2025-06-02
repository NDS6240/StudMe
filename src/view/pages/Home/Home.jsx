import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useRedirectIfNotLoggedIn from "../../hooks/useRedirectIfNotLoggedIn";
import { collection, getDocs, query, where, limit } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import styles from "./Home.module.css";
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useRedirectIfNotLoggedIn();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      setLoading(true);
      const tasksSnap = await getDocs(
        query(
          collection(db, "tasks"),
          where("userId", "==", user.uid),
          limit(9)
        )
      );
      const tasksData = tasksSnap.docs.map((doc) => doc.data());

      const sortedTasks = tasksData.sort(
        (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
      );

      setTasks(sortedTasks);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "forums"));
        let roomList = [];
        querySnapshot.forEach((doc) => {
          roomList.push({ id: doc.id, ...doc.data() });
        });

        const shuffled = roomList.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        setRooms(selected);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      }
    };

    fetchRooms();
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
        <h2>Upcoming Tasks</h2>

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
        <div className={styles.buttonWrapper}>
          <Link to="/new-task" className={styles.ctaButton}>
            Add New Task
          </Link>
        </div>
      </section>

      <section className={styles.latestSection}>
        <h2>Study Rooms</h2>
        <div className={styles.grid}>
          {rooms.map((room) => (
            <div
              key={room.id}
              className={styles.card}
              onClick={() => navigate(`/chat/${room.id}`)}
              style={{ cursor: "pointer" }}
            >
              <h3>{room.title}</h3>
            </div>
          ))}
        </div>
        <div className={styles.buttonWrapper}>
          <Link to="/ForumPage" className={styles.ctaButton}>
            Go to All Study Rooms
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

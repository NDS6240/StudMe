import { useEffect, useState } from "react";
import styles from "./TaskManager.module.css";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const TaskManager = () => {
  const [userId, setUserId] = useState(null);
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        loadTasks(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadTasks = async (uid) => {
    const q = query(collection(db, "tasks"), where("userId", "==", uid));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setTasks(data);
  };

  const handleDelete = async (taskId) => {
    await deleteDoc(doc(db, "tasks", taskId));
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className={styles.container}>
      <section className={styles.deadlines}>
        <h2>Upcoming Deadlines</h2>
        <div className={styles.deadlineCards}>
          {tasks.map((task) => (
            <div key={task.id} className={styles.card}>
              <strong>{task.title}</strong>
              <p>{task.course}</p>
              <small>{task.dueDate}</small>
            </div>
          ))}
        </div>
        <button className={styles.calendarBtn}>View Full Calendar</button>
      </section>

      <section className={styles.taskTable}>
        <div className={styles.filters}>
          <button
            className={styles.addBtn}
            onClick={() => navigate("/new-task")}
          >
            + Add Task
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Course</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className={styles[`priority_${task.priority?.toLowerCase()}`]}
              >
                <td>{task.title}</td>
                <td>{task.course}</td>
                <td>{task.dueDate}</td>
                <td>{task.priority}</td>
                <td>{task.status}</td>
                <td>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className={styles.doneBtn}
                  >
                    completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default TaskManager;

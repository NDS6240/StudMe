import { useEffect, useState } from "react";
import styles from "./TaskManager.module.css";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";
import useRedirectIfNotLoggedIn from "../../hooks/useRedirectIfNotLoggedIn";

const TaskManager = () => {
  const user = useAuthUser();
  useRedirectIfNotLoggedIn();
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === undefined) return;
    if (!user) {
      navigate("/login");
    } else {
      loadTasks(user.uid);
    }
  }, [user, navigate]);

  const loadTasks = async (uid) => {
    const q = query(collection(db, "tasks"), where("userId", "==", uid));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    const sortedData = data.sort(
      (a, b) => new Date(a.dueDate) - new Date(b.dueDate)
    );

    setTasks(sortedData);
  };

  const handleDelete = async (taskId) => {
    await deleteDoc(doc(db, "tasks", taskId));
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  if (user === undefined) return null;

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

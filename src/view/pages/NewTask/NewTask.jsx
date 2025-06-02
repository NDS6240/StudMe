import { useState, useEffect } from "react";
import styles from "./NewTask.module.css";
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from "../../../firebase";
import useRedirectIfNotLoggedIn from "../../hooks/useRedirectIfNotLoggedIn";
import { useNavigate } from "react-router-dom";

const NewTask = () => {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  const navigate = useNavigate();
  useRedirectIfNotLoggedIn();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/login");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !course || !dueDate) return;

    const userId = auth.currentUser?.uid;
    if (!userId) return;

    await addDoc(collection(db, "tasks"), {
      title,
      course,
      dueDate,
      priority,

      status: "To Do",
      userId,
    });

    setTitle("");
    setCourse("");
    setDueDate("");
    setPriority("Medium");
    alert("Task saved!");
    navigate("/task-manager");
  };

  return (
    <div className={styles.container}>
      <h1>Create New Task</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Task Title</label>
        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Course</label>
        <input
          type="text"
          placeholder="Enter course name"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <label>Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <label>Priority Level</label>
        <div className={styles.radioGroup}>
          {["Low", "Medium", "High"].map((level) => (
            <label key={level}>
              <input
                type="radio"
                name="priority"
                value={level}
                checked={priority === level}
                onChange={(e) => setPriority(e.target.value)}
              />
              {level}
            </label>
          ))}
        </div>

        <button type="submit">Save Task</button>
      </form>
    </div>
  );
};

export default NewTask;

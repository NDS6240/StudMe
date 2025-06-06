import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebase";
import { getAuth } from "firebase/auth";
import styles from "./NewForumPage.module.css";

const NewForumForm = ({ onCreated }) => {
  // Holds the input value for the new room's title
  const [title, setTitle] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const user = getAuth().currentUser;

    try {
      await addDoc(collection(db, "forums"), {
        title,
        createdAt: serverTimestamp(), // Store creation timestamp
        createdBy: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || ""
        }
      });

      setTitle("");

      if (onCreated) onCreated();
    } catch (error) {
      console.error("Error creating forum:", error);
    }
  };

  return (
    <form onSubmit={handleCreate} className={styles.form}>
      <input
        type="text"
        placeholder="Forum Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit">Create Forum</button>
    </form>
  );
};

export default NewForumForm;
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "./AdminDashboard.module.css";

const AdminForums = () => {
  const [forums, setForums] = useState([]);
  const [forumSearch, setForumSearch] = useState("");
  const [editingForum, setEditingForum] = useState(null);
  const [editedForumTitle, setEditedForumTitle] = useState("");

  // Fetch forums from Firestore
  useEffect(() => {
    const fetchForums = async () => {
      const snapshot = await getDocs(collection(db, "forums"));
      setForums(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchForums();
  }, []);

  const handleDeleteForum = async (id) => {
    await deleteDoc(doc(db, "forums", id));
    setForums((prev) => prev.filter((f) => f.id !== id));
  };

  const handleEditForum = (forum) => {
    setEditingForum(forum);
    setEditedForumTitle(forum.title || "");
  };
  // Save edited forum title to Firestore
  const handleSaveForumTitle = async () => {
    await updateDoc(doc(db, "forums", editingForum.id), {
      title: editedForumTitle,
    });
    setForums((prev) =>
      prev.map((f) =>
        f.id === editingForum.id ? { ...f, title: editedForumTitle } : f
      )
    );
    setEditingForum(null);
    setEditedForumTitle("");
  };

  return (
    <div className={styles.section}>
      <h2>Forum Management</h2>
      <input
        type="text"
        placeholder="Search forums..."
        onChange={(e) => setForumSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {forums
            .filter((f) =>
              (f.title || "").toLowerCase().includes(forumSearch.toLowerCase())
            )
            .map((f) => (
              <tr key={f.id}>
                <td>{f.title || "Untitled"}</td>
                <td>
                  {f.createdBy?.displayName || f.createdBy?.email || "Unknown"}
                </td>
                <td>
                  <button
                    className={styles.edit}
                    onClick={() => handleEditForum(f)}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.delete}
                    onClick={() => handleDeleteForum(f.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {editingForum && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Edit Forum Title</h3>
            <label>
              Title:
              <input
                value={editedForumTitle}
                onChange={(e) => setEditedForumTitle(e.target.value)}
              />
            </label>
            <div className={styles.modalActions}>
              <button onClick={handleSaveForumTitle}>Save</button>
              <button onClick={() => setEditingForum(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminForums;

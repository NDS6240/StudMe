import React, { useEffect, useState } from "react";
import { db } from "../../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import styles from "./AdminDashboard.module.css";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [summaries, setSummaries] = useState([]);
  const [users, setUsers] = useState([]);
  const [forums, setForums] = useState([]);

  const [summarySearch, setSummarySearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [forumSearch, setForumSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const user = getAuth().currentUser;
      if (!user) {
        navigate("/login");
        return;
      }
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists() || !docSnap.data().isAdmin) {
        navigate("/");
      }
    };
    checkAdmin();
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      const summariesSnapshot = await getDocs(collection(db, "summaries"));
      const usersSnapshot = await getDocs(collection(db, "users"));
      const forumsSnapshot = await getDocs(collection(db, "forums"));

      setSummaries(
        summariesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setUsers(
        usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setForums(
        forumsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchData();
  }, []);

  const handleDeleteSummary = async (id) => {
    await deleteDoc(doc(db, "summaries", id));
    setSummaries((prev) => prev.filter((s) => s.id !== id));
  };

  const handleDeleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleDeleteForum = async (id) => {
    await deleteDoc(doc(db, "forums", id));
    setForums((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>

      {/* Summary Management */}
      <div className={styles.section}>
        <h2>Summary Management</h2>
        <input
          type="text"
          placeholder="Search summaries..."
          onChange={(e) => setSummarySearch(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Course</th>
              <th>Created By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {summaries
              .filter((s) =>
                (s.title || "")
                  .toLowerCase()
                  .includes(summarySearch.toLowerCase())
              )
              .map((s) => (
                <tr key={s.id}>
                  <td>{s.title}</td>
                  <td>{s.course}</td>
                  <td>
                    {s.createdBy?.displayName ||
                      s.createdBy?.email ||
                      "Unknown"}
                  </td>
                  <td>
                    <button
                      className={styles.delete}
                      onClick={() => handleDeleteSummary(s.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* User Management */}
      <div className={styles.section}>
        <h2>User Management</h2>
        <input
          type="text"
          placeholder="Search users..."
          onChange={(e) => setUserSearch(e.target.value)}
        />
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((u) => {
                const name = `${u.firstName || ""} ${
                  u.lastName || ""
                }`.toLowerCase();
                return (
                  name.includes(userSearch.toLowerCase()) ||
                  (u.email || "")
                    .toLowerCase()
                    .includes(userSearch.toLowerCase())
                );
              })
              .map((u) => (
                <tr key={u.id}>
                  <td>
                    {u.firstName} {u.lastName}
                  </td>
                  <td>{u.email}</td>
                  <td>
                    <button
                      className={styles.delete}
                      onClick={() => handleDeleteUser(u.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Forum Management */}
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
                (f.title || "")
                  .toLowerCase()
                  .includes(forumSearch.toLowerCase())
              )
              .map((f) => (
                <tr key={f.id}>
                  <td>{f.title || "Untitled"}</td>
                  <td>
                    {f.createdBy?.displayName ||
                      f.createdBy?.email ||
                      "Unknown"}
                  </td>
                  <td>
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
      </div>
    </div>
  );
};

export default AdminDashboard;

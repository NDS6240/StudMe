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

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [editingUser, setEditingUser] = useState(null);
  const [editedData, setEditedData] = useState({});

  // Load users from Firestore
  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      setUsers(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditedData(user);
  };

  // Update user document in Firestore
  const handleSaveEdit = async () => {
    await updateDoc(doc(db, "users", editingUser.id), editedData);
    setUsers((prev) =>
      prev.map((u) => (u.id === editingUser.id ? { ...u, ...editedData } : u))
    );
    setEditingUser(null);
    setEditedData({});
  };

  return (
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
            <th>Age</th>
            <th>Degree</th>
            <th>University</th>
            <th>Is Admin?</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* search by name or email */}
          {users
            .filter((u) => {
              const name = `${u.firstName || ""} ${
                u.lastName || ""
              }`.toLowerCase();
              return (
                name.includes(userSearch.toLowerCase()) ||
                (u.email || "").toLowerCase().includes(userSearch.toLowerCase())
              );
            })
            .map((u) => (
              <tr key={u.id}>
                <td>
                  {u.firstName} {u.lastName}
                </td>
                <td>{u.email}</td>
                <td>{u.age}</td>
                <td>{u.degree}</td>
                <td>{u.university}</td>
                <td>{u.isAdmin ? "Yes" : "No"}</td>
                <td>
                  <button
                    className={styles.edit}
                    onClick={() => handleEditUser(u)}
                  >
                    Edit
                  </button>
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

      {editingUser && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Edit User</h3>
            <label>
              First Name:
              <input
                value={editedData.firstName || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, firstName: e.target.value })
                }
              />
            </label>
            <label>
              Last Name:
              <input
                value={editedData.lastName || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, lastName: e.target.value })
                }
              />
            </label>
            <label>
              Age:
              <input
                value={editedData.age || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, age: e.target.value })
                }
              />
            </label>
            <label>
              Degree:
              <input
                value={editedData.degree || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, degree: e.target.value })
                }
              />
            </label>
            <label>
              University:
              <input
                value={editedData.university || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, university: e.target.value })
                }
              />
            </label>
            <label>
              <input
                type="checkbox"
                checked={editedData.isAdmin || false}
                onChange={(e) =>
                  setEditedData({ ...editedData, isAdmin: e.target.checked })
                }
              />{" "}
              Admin
            </label>
            <div className={styles.modalActions}>
              <button onClick={handleSaveEdit}>Save</button>
              <button onClick={() => setEditingUser(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;

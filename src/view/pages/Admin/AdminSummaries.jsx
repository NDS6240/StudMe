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

const AdminSummaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [summarySearch, setSummarySearch] = useState("");
  const [editingSummary, setEditingSummary] = useState(null);
  const [editedSummaryData, setEditedSummaryData] = useState({});

  // Load summaries from Firestore
  useEffect(() => {
    const fetchSummaries = async () => {
      const snapshot = await getDocs(collection(db, "summaries"));
      setSummaries(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };
    fetchSummaries();
  }, []);

  const handleDeleteSummary = async (id) => {
    await deleteDoc(doc(db, "summaries", id));
    setSummaries((prev) => prev.filter((s) => s.id !== id));
  };

  const handleEditSummary = (summary) => {
    setEditingSummary(summary);
    setEditedSummaryData({
      title: summary.title || "",
      course: summary.course || "",
    });
  };

  // Save updated summary to Firestore
  const handleSaveSummaryEdit = async () => {
    await updateDoc(doc(db, "summaries", editingSummary.id), editedSummaryData);
    setSummaries((prev) =>
      prev.map((s) =>
        s.id === editingSummary.id ? { ...s, ...editedSummaryData } : s
      )
    );
    setEditingSummary(null);
    setEditedSummaryData({});
  };

  return (
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
                  {s.createdBy?.displayName || s.createdBy?.email || "Unknown"}
                </td>
                <td>
                  <button
                    className={styles.edit}
                    onClick={() => handleEditSummary(s)}
                  >
                    Edit
                  </button>
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

      {editingSummary && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Edit Summary</h3>
            <label>
              Title:
              <input
                value={editedSummaryData.title}
                onChange={(e) =>
                  setEditedSummaryData({
                    ...editedSummaryData,
                    title: e.target.value,
                  })
                }
              />
            </label>
            <label>
              Course:
              <input
                value={editedSummaryData.course}
                onChange={(e) =>
                  setEditedSummaryData({
                    ...editedSummaryData,
                    course: e.target.value,
                  })
                }
              />
            </label>
            <div className={styles.modalActions}>
              <button onClick={handleSaveSummaryEdit}>Save</button>
              <button onClick={() => setEditingSummary(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSummaries;

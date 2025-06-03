import { useState } from "react";
import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import styles from "./UploadSummary.module.css";
import { useNavigate } from "react-router-dom";
import useRedirectIfNotLoggedIn from "../../hooks/useRedirectIfNotLoggedIn";

const UploadSummary = () => {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [fileURL, setFileURL] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Custom hook that redirects to login if no user authenticated.
  useRedirectIfNotLoggedIn();

  // Validates input fields and uploads summary data to Firestore
  // Prevents submission if any field is empty
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !course || !fileURL) {
      alert("Please fill in all fields.");
      return;
    }

    setUploading(true);

    try {
      await addDoc(collection(db, "summaries"), {
        title,
        course,
        fileURL,
        createdAt: new Date(),
      });

      alert("Summary added successfully ✅");
      setTitle("");
      setCourse("");
      setFileURL("");
      navigate("/summary-library");
    } catch (err) {
      console.error("Error saving summary:", err);
      alert("Failed to save summary.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Upload Summary</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Summary Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter summary title"
        />

        <label>Course Name</label>
        <input
          type="text"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          placeholder="Enter course name"
        />

        <label>Summary Link (Google Drive / Dropbox / etc.)</label>
        <input
          type="url"
          value={fileURL}
          onChange={(e) => setFileURL(e.target.value)}
          placeholder="Paste the link to your file"
        />

        <button type="submit" className={styles.uploadBtn} disabled={uploading}>
          {uploading ? "Saving..." : "Submit Summary"}
        </button>
      </form>
    </div>
  );
};

export default UploadSummary;

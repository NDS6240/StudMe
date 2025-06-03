import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import styles from "./SummaryLibrary.module.css";
import useRedirectIfNotLoggedIn from "../../hooks/useRedirectIfNotLoggedIn";

const SummaryLibrary = () => {
  const [summaries, setSummaries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Custom hook that redirects to login if no user authenticated.
  useRedirectIfNotLoggedIn();

  // Fetches all summary documents from the 'summaries' collection in Firestore
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "summaries"));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSummaries(data);
    };

    fetchData();
  }, []);

  // Filters summaries by matching the search term against title and course (case-insensitive)
  const filteredSummaries = summaries.filter((summary) =>
    (summary.title + " " + summary.course)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.heroImageWrapper}>
        <img
          src="/images/summary-library.jpg"
          alt="Summary Library"
          className={styles.heroImage}
        />
        <h1 className={styles.pageTitle}>Summary Library</h1>
      </div>
      <Link to="/upload-summary">
        <button className={styles.uploadBtn}>Upload Summary</button>
      </Link>

      <input
        type="text"
        placeholder="Search by title or course..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.cardGrid}>
        {filteredSummaries.map((summary) => (
          <div key={summary.id} className={styles.card}>
            <h3>{summary.title}</h3>
            <p>
              <strong>Course:</strong> {summary.course}
            </p>

            {summary.fileURL && (
              <a
                href={summary.fileURL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.viewBtn}
              >
                View Summary
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryLibrary;

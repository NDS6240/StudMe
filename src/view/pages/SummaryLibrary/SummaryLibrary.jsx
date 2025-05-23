import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import styles from "./SummaryLibrary.module.css";
import useRedirectIfNotLoggedIn from "../../hooks/useRedirectIfNotLoggedIn";

const SummaryLibrary = () => {
  const [summaries, setSummaries] = useState([]);
  useRedirectIfNotLoggedIn();
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

  return (
    <div className={styles.container}>
      <Link to="/upload-summary">
        <button className={styles.uploadBtn}>Upload Summary</button>
      </Link>

      <div className={styles.cardGrid}>
        {summaries.map((summary) => (
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

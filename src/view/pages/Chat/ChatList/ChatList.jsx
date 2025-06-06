import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useNavigate } from "react-router-dom";
import styles from "./ChatList.module.css";

const ChatList = ({ refreshTrigger }) => {
  const [forums, setForums] = useState([]);
  const navigate = useNavigate();

  // Fetches all documents from the "forums" collection
  useEffect(() => {
    const fetchForums = async () => {
      const snapshot = await getDocs(collection(db, "forums"));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setForums(data);
    };
    fetchForums();
  }, [refreshTrigger]); // Re-fetch after creating a new room

  return (
    <div className={styles.grid}>
      {forums.length === 0 ? (
        <p>No rooms found.</p>
      ) : (
        forums.map((forum) => (
          <div
            key={forum.id}
            className={styles.card}
            // Redirects to selected chat room
            onClick={() => navigate(`/chat/${forum.id}`)}
          >
            <strong>{forum.title}</strong>
            <p>{forum.description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatList;

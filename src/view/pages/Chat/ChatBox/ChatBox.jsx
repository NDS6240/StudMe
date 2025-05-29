import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../../firebase";
import Message from "../Message/Message";
import styles from "./ChatBox.module.css";
import { updateProfile, getAuth } from "firebase/auth";

const ChatBox = ({ forumId, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [namePrompt, setNamePrompt] = useState("");

  useEffect(() => {
    if (!forumId) return;

    const q = query(
      collection(db, "forums", forumId, "posts"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setMessages(data);
    });

    return () => unsubscribe();
  }, [forumId]);

  const handleSend = async () => {
    if (!text.trim()) return;

    const nameToUse =
      currentUser?.displayName ||
      currentUser?.email?.split("@")[0] ||
      "Anonymous";

    try {
      await addDoc(collection(db, "forums", forumId, "posts"), {
        content: text,
        authorId: currentUser?.uid || "anonymous",
        authorName: nameToUse,
        createdAt: serverTimestamp(),
      });
      setText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const saveName = async () => {
    if (!namePrompt.trim()) return;
    try {
      const auth = getAuth();
      await updateProfile(auth.currentUser, {
        displayName: namePrompt,
      });
      window.location.reload();
    } catch (error) {
      console.error("Failed to update display name", error);
    }
  };

  if (currentUser && !currentUser.displayName) {
    return (
      <div className={styles.box}>
        <h3>Hey there! 👋</h3>
        <p>Please enter your name to start chatting:</p>
        <input
          type="text"
          placeholder="Your name"
          value={namePrompt}
          onChange={(e) => setNamePrompt(e.target.value)}
        />
        <button onClick={saveName}>Save</button>
      </div>
    );
  }

  return (
    <div className={styles.box}>
      <div className={styles.messages}>
        {messages.length === 0 ? (
          <p className={styles.noMessages}>No messages in this room yet 🕊️</p>
        ) : (
          messages.map((msg, i) => (
            <Message
              key={i}
              message={msg}
              isOwn={msg.authorId === currentUser?.uid}
            />
          ))
        )}
      </div>

      <div className={styles.input}>
        <input
          type="text"
          placeholder="Write a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatBox;

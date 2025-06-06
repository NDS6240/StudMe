import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import useAuthUser from "../../../hooks/useAuthUser";
import useRedirectIfNotLoggedIn from "../../../hooks/useRedirectIfNotLoggedIn";
import ChatBox from "../ChatBox/ChatBox";
import styles from "./ChatRoomPage.module.css";

const ChatRoomPage = () => {
  // Gets the room ID from the URL
  const { roomId } = useParams();

  const currentUser = useAuthUser();

  // Custom hook that redirects to login if no user authenticated.
  useRedirectIfNotLoggedIn();

  const [forumTitle, setForumTitle] = useState("Loading...");

  // Fetches forum room title from Firestore using roomId
  useEffect(() => {
    const fetchForum = async () => {
      try {
        const docRef = doc(db, "forums", roomId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setForumTitle(docSnap.data().title || "Unnamed Room");
        } else {
          setForumTitle("Room Not Found");
        }
      } catch (error) {
        console.error("Error fetching forum:", error);
        setForumTitle("Error Loading Room");
      }
    };

    if (roomId) fetchForum();
  }, [roomId]);

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>{forumTitle}</h2>
      <ChatBox forumId={roomId} currentUser={currentUser} />
    </div>
  );
};

export default ChatRoomPage;

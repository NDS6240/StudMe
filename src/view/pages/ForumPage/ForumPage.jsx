import { useState } from "react";
import NewForumForm from "../NewForumPage/NewForumPage";
import ChatList from "../Chat/ChatList/ChatList";
import useRedirectIfNotLoggedIn from "../../hooks/useRedirectIfNotLoggedIn";
import styles from "./ForumPage.module.css";

const ForumPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  useRedirectIfNotLoggedIn();

  return (
    <>
      <div className={styles.heroImageWrapper}>
        <img
          src="/images/study-rooms.jpg"
          alt="Study Rooms"
          className={styles.heroImage}
        />
       
      </div>

      <div className={styles.page}>
        <div className={styles.content}>
          <div className={styles.formWrapper}>
            <NewForumForm onCreated={() => setRefreshTrigger((r) => r + 1)} />
          </div>

          <div className={styles.roomsWrapper}>
            <ChatList refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForumPage;
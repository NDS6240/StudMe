import React from "react";
import styles from "./Message.module.css";

const Message = ({ message, isOwn }) => {
  return (
    <div className={`${styles.message} ${isOwn ? styles.own : styles.other}`}>
      <p className={styles.name}>{message.authorName || "Anonymous"}</p>
      <p className={styles.text}>{message.content}</p>
    </div>
  );
};

export default Message;

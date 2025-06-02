import { useEffect, useState } from "react";
import useRedirectIfNotLoggedIn from "../../hooks/useRedirectIfNotLoggedIn";
import {
  getAuth,
  updateEmail,
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import styles from "./Help_And_Settings.module.css";
import useAuthUser from "../../hooks/useAuthUser";

const Help_And_Settings = () => {
  useRedirectIfNotLoggedIn();
  const user = useAuthUser();
  const auth = getAuth();
  const db = getFirestore();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    university: "",
    degree: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    helpSubject: "",
    helpMessage: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const [first, ...rest] = (user.displayName || "").split(" ");
        const userDoc = await getDoc(doc(db, "users", user.uid));

        setForm({
          firstName: first || "",
          lastName: rest.join(" ") || "",
          age: userDoc.data()?.age || "",
          university: userDoc.data()?.university || "",
          degree: userDoc.data()?.degree || "",
          email: user.email || "",
          currentPassword: "",
          newPassword: "",
        });
      }
    };

    fetchUserData();
  }, [user]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    setMessage("");
    try {
      if (!user) return;

      const {
        firstName,
        lastName,
        age,
        university,
        degree,
        email,
        currentPassword,
        newPassword,
      } = form;

      const fullName = `${firstName} ${lastName}`;

      if (user.email !== email) {
        await updateEmail(user, email);
      }

      if (user.displayName !== fullName) {
        await updateProfile(user, { displayName: fullName });
      }

      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        age,
        university,
        degree,
        email,
      });

      if (currentPassword && newPassword) {
        const credential = EmailAuthProvider.credential(
          user.email,
          currentPassword
        );
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
      }

      setMessage("Details updated successfully ✅");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  if (!user) return null;

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
        <h2>User Settings</h2>

        <div className={styles.group}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
        </div>

        <div className={styles.group}>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
        </div>

        <div className={styles.group}>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={form.age}
            onChange={handleChange}
          />
        </div>

        <div className={styles.group}>
          <label>University / College</label>
          <input
            type="text"
            name="university"
            value={form.university}
            onChange={handleChange}
          />
        </div>

        <div className={styles.group}>
          <label>Field of Study / Degree</label>
          <input
            type="text"
            name="degree"
            value={form.degree}
            onChange={handleChange}
          />
        </div>

        <div className={styles.group}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.group}>
          <label>Current Password (to change password)</label>
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
          />
        </div>

        <div className={styles.group}>
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.button}>
          Save Changes
        </button>
        
        <hr className={styles.divider} />

        <h3>Need Help?</h3>

        <div className={styles.group}>
          <label>Subject</label>
          <input
            type="text"
            name="helpSubject"
            value={form.helpSubject || ""}
            onChange={handleChange}
          />
        </div>

        <div className={styles.group}>
          <label>Describe your issue</label>
          <textarea
            name="helpMessage"
            value={form.helpMessage || ""}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <button
          type="button"
          className={styles.button}
          onClick={() => {
            if (!form.helpSubject || !form.helpMessage) {
              setMessage(
                "Please fill in subject and message before sending help request."
              );
            } else {
              console.log("Help Request Submitted:", {
                user: user.email,
                subject: form.helpSubject,
                message: form.helpMessage,
              });
              setMessage(
                "Your request has been submitted. We'll get back to you soon."
              );
              setForm((prev) => ({
                ...prev,
                helpSubject: "",
                helpMessage: "",
              }));
            }
          }}
        >
          Submit Help Request
        </button>

        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default Help_And_Settings;

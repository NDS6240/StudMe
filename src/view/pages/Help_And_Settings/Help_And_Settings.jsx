import { useEffect, useState } from "react";
import useRedirectIfNotLoggedIn from "../../hooks/useRedirectIfNotLoggedIn";
import {
  getAuth,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  getFirestore
} from "firebase/firestore";
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
    password: "",
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
          password: "",
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
        email
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

      setMessage("Details updated successfully ✅");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  if (!user) return null;

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => {
        e.preventDefault();
        handleSave();
      }}>
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
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            disabled
          />
        </div>

        <button type="submit" className={styles.button}>
          Save Changes
        </button>

        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default Help_And_Settings;
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    university: "",
    degree: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isPasswordStrong = (password) => {
    const strongRegex = /^(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    return strongRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const {
      firstName,
      lastName,
      age,
      university,
      degree,
      email,
      password,
      confirmPassword,
    } = formData;

    if (password !== confirmPassword) {
      return setError("Passwords do not match.");
    }

    if (!isPasswordStrong(password)) {
      return setError(
        "Password must be at least 8 characters, contain a capital letter and a number."
      );
    }
    // Checking if email already signed
    try {
      const existingUsers = await getDocs(collection(db, "users"));
      const exists = existingUsers.docs.some(
        (doc) => doc.data().email.toLowerCase() === email.toLowerCase()
      );
      if (exists) {
        return setError("Email already exists in our system.");
      }

      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: `${firstName} ${lastName}`,
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        firstName,
        lastName,
        age,
        university,
        degree,
        email,
        isAdmin: false,
      });

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Create New Account</h2>

        <div className={styles.group}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <label>University / College</label>
          <input
            type="text"
            name="university"
            value={formData.university}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <label>Field of Study</label>
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.group}>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.button}>
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUp;

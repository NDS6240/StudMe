import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import styles from "./Login.module.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Updates the form state when user types into input fields
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { email, password } = formData;
    const auth = getAuth();

    try {
      // Tries to sign in with Firebase Authentication
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      // Shows an error if login fails
      setError("Invalid email or password.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Login to Your Account</h2>

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

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.button}>
          Log In
        </button>
        <p className={styles.switchText}>
          Don't have an account?{" "}
          <a href="/signUp" className={styles.link}>
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;

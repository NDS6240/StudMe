import styles from "./UploadSummary.module.css";

const UploadSummary = () => {
  return (
    <div className={styles.container}>
      <h1>Upload Summary</h1>

      <form className={styles.form}>
        <label>Summary Title</label>
        <input type="text" placeholder="Enter summary title" />

        <label>Course Name</label>
        <select>
          <option value="">Select Course</option>
        </select>

        <label>Institution (Optional)</label>
        <input type="text" placeholder="Your university or college" />

        <label>Summary Description</label>
        <textarea placeholder="Provide a brief overview of your summary"></textarea>

        <label>Upload Summary File</label>
        <div className={styles.uploadBox}>
          Drag and drop or click to upload PDF/DOC
        </div>

        <label className={styles.checkbox}>
          <input type="checkbox" />I agree to the content upload guidelines
        </label>

        <button type="submit">Submit Summary</button>
      </form>
    </div>
  );
};

export default UploadSummary;

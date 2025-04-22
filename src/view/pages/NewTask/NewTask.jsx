import styles from './NewTask.module.css';

const NewTask = () => {
  return (
    <div className={styles.container}>
      <h1>Create New Task</h1>

      <form className={styles.form}>
        <label>Task Title</label>
        <input type="text" placeholder="Enter task title" />

   
        <label>Course</label>
        <select>
          <option value="">Select Course</option>
        </select>

        <label>Due Date</label>
        <input type="date" />

        <label>Priority Level</label>
        <div className={styles.radioGroup}>
          <label><input type="radio" name="priority" /> Low</label>
          <label><input type="radio" name="priority" /> Medium</label>
          <label><input type="radio" name="priority" /> High</label>
        </div>

        <label>Notes (Optional)</label>
        <textarea placeholder="Additional task details"></textarea>

        <button type="submit">Save Task</button>
      </form>
    </div>
  );
};

export default NewTask;
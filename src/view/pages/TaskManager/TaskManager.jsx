import styles from './TaskManager.module.css';

const TaskManager = () => {
  return (
    <div className={styles.container}>
      <section className={styles.deadlines}>
        <h2>Upcoming Deadlines</h2>
        <div className={styles.deadlineCards}>
       
        </div>
        <button className={styles.calendarBtn}>View Full Calendar</button>
      </section>

      <section className={styles.taskTable}>
        <div className={styles.filters}>
          <select>
            <option>Filter by Course</option>
          </select>
          <select>
            <option>Priority</option>
          </select>
          <select>
            <option>Due Date</option>
          </select>
          <button className={styles.addBtn}>+ Add Task</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Course</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </section>
    </div>
  );
};

export default TaskManager;
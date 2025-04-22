import styles from './Student.module.css';

const Student = () => {
  return (
    <div className={styles.container}>
      <h1>Student Dashboard</h1>
      <div className={styles.grid}>
        <div className={styles.card}>
          <h3>Summaries Uploaded Per Month</h3>
          {/* LineChart goes here */}
        </div>

        <div className={styles.card}>
          <h3>Task Completion Rates</h3>
          {/* PieChart goes here */}
        </div>

        <div className={styles.card}>
          <h3>Most Popular Courses</h3>
          {/* BarChart goes here */}
        </div>

        <div className={styles.card}>
          <h3>Student Engagement Levels</h3>
          {/* RadarChart goes here */}
        </div>
      </div>
    </div>
  );
};

export default Student;
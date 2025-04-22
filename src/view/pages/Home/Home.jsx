import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>


      <section className={styles.hero}>
        <h1>Empower Your Learning Journey</h1>
        <p>
          EduSync is your all-in-one platform designed to simplify student life,
          boost productivity, and connect you with a community of learners.
        </p>
        <a href="#" className={styles.ctaButton}>Get Started - It's Free!</a>
      </section>

     
      <section className={styles.features}>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>📚</div>
          <h3>Smart Summary Library</h3>
          <p>Access curated, expert-approved study summaries across various courses and institutions.</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>📅</div>
          <h3>Task Management</h3>
          <p>Organize assignments, track deadlines, and sync your academic schedule effortlessly.</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>✍️</div>
          <h3>Writing Tools</h3>
          <p>Improve your academic writing with intelligent feedback and professional templates.</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>🤝</div>
          <h3>Student Network</h3>
          <p>Connect with peers, join study communities, and collaborate on academic projects.</p>
        </div>
      </section>


     
    </div>
  );
};

export default Home;
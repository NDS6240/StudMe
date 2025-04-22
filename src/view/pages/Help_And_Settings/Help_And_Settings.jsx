import styles from './Help_And_Settings.module.css';

const Help_And_Settings = () => {
  return (
    <div className={styles.container}>
      <div className={styles.help}>
        <h2>Help & Support</h2>
        <div className={styles.searchRow}>
          <input type="text" placeholder="Search help topics..." />
          <button className={styles.searchBtn}>Search</button>
        </div>

        <div className={styles.accordion}>
        </div>

        <button className={styles.contactBtn}>Contact Support</button>
      </div>


      <div className={styles.settings}>
        <h2>User Settings</h2>

        <h4>Profile Information</h4>
        <input type="text" placeholder="Your Full Name" />
        <input type="email" placeholder="your.email@example.com" />
        <input type="password" placeholder="********" />

        <h4>Notification Preferences</h4>
        <label>
          <input type="checkbox" /> Email Notifications
        </label>
        <label>
          <input type="checkbox" /> Push Notifications
        </label>

        <h4>Appearance</h4>
        <label>
          <input type="checkbox" /> Dark Mode
        </label>
      </div>
    </div>
  );
};

export default Help_And_Settings;
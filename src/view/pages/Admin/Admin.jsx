import styles from './Admin.module.css';

const Admin = () => {
  return (
    <div className={styles.container}>
      <h1>Admin Dashboard</h1>


      <section className={styles.card}>
        <h2>Summary Management</h2>
        <div className={styles.searchRow}>
          <input type="text" placeholder="Search summaries..." />
          <button className={styles.searchBtn}>Search</button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Course</th>
              <th>Institution</th>
              <th>Rating</th>
              <th>Approval Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
        
              <td>
                <button className={styles.approve}>Approve</button>
                <button className={styles.reject}>Reject</button>
                <button className={styles.edit}>Edit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className={styles.card}>
        <h2>User Management</h2>
        <div className={styles.searchRow}>
          <input type="text" placeholder="Search users..." />
          <button className={styles.searchBtn}>Search</button>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Account Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
           
              <td>
                <button className={styles.edit}>Edit</button>
                <button className={styles.ban}>Ban</button>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Admin;
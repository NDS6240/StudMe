import styles from './SummaryLibrary.module.css';

const SummaryLibrary = () => {
  return (
    <div className={styles.container}>

      <div className={styles.searchBar}>
        <input type="text" placeholder="Search summaries by course, topic, or institution" />
        <button className={styles.searchBtn}>Search</button>
      </div>

      <div className={styles.filters}>
        <select>
          <option>Sort by</option>
        </select>
        <select>
          <option>Filter by</option>
        </select>
        <button className={styles.uploadBtn}>Upload Summary</button>
      </div>

     
      <div className={styles.cardGrid}>
       
      </div>
    </div>
  );
};

export default SummaryLibrary;
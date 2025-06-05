import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "./AdminDashboard.module.css";

// Recharts components for visual charts
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#00C49F",
  "#FFBB28",
];

const AdminStats = () => {
  const [users, setUsers] = useState([]);
  const [summaries, setSummaries] = useState([]);
  const [forums, setForums] = useState([]);
  //Loading data from firebase
  useEffect(() => {
    const fetchData = async () => {
      const usersSnap = await getDocs(collection(db, "users"));
      const summariesSnap = await getDocs(collection(db, "summaries"));
      const forumsSnap = await getDocs(collection(db, "forums"));

      setUsers(usersSnap.docs.map((doc) => doc.data()));
      setSummaries(summariesSnap.docs.map((doc) => doc.data()));
      setForums(forumsSnap.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, []);

  // Count how many admins
  const adminCount = users.filter((u) => u.isAdmin).length;

  // Aggregate users by university
  const universityStats = users.reduce((acc, user) => {
    const uni = user.university || "Unknown";
    acc[uni] = (acc[uni] || 0) + 1;
    return acc;
  }, {});

  // Aggregate users by degree
  const degreeStats = users.reduce((acc, user) => {
    const degree = user.degree || "Unknown";
    acc[degree] = (acc[degree] || 0) + 1;
    return acc;
  }, {});

  // Convert objects to array for chart data
  const universityData = Object.entries(universityStats).map(
    ([name, value]) => ({ name, value })
  );
  const degreeData = Object.entries(degreeStats).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className={styles.section}>
      <h2>Platform Statistics</h2>
      <p>
        <strong>Total Users:</strong> {users.length}
      </p>
      <p>
        <strong>Admin Users:</strong> {adminCount}
      </p>
      <p>
        <strong>Total Summaries:</strong> {summaries.length}
      </p>
      <p>
        <strong>Total Forums:</strong> {forums.length}
      </p>

      <div style={{ width: "100%", height: 300 }}>
        <h3>Users by University</h3>
        <ResponsiveContainer>
          <BarChart data={universityData}>
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value">
              {universityData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: "100%", height: 300 }}>
        <h3>Users by Degree</h3>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={degreeData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {degreeData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminStats;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './view/components/Navbar';
import Home from './view/pages/Home/Home';
import Admin from './view/pages/Admin/Admin';
import Student from './view/pages/Student/Student';
import NewTask from './view/pages/NewTask/NewTask';
import UploadSummary from './view/pages/UploadSummary/UploadSummary';
import SummaryLibrary from './view/pages/SummaryLibrary/SummaryLibrary';
import TaskManager from './view/pages/TaskManager/TaskManager';
import Help from './view/pages/Help/Help';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/student" element={<Student />} />
        <Route path="/new-task" element={<NewTask />} />
        <Route path="/upload-summary" element={<UploadSummary />} />
        <Route path="/summary-library" element={<SummaryLibrary />} />
        <Route path="/task-manager" element={<TaskManager />} />
        <Route path="/help" element={<Help />} />
      </Routes>
    </>
  );
}

export default App;
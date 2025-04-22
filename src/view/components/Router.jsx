import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "../pages/Home/Home";
import Admin from "../pages/Admin/Admin";
import Help_And_Settings from "../pages/Help_And_Settings/Help_And_Settings";
import NewTask from "../pages/NewTask/NewTask";
import Student from "../pages/Student/Student";
import SummaryLibrary from "../pages/SummaryLibrary/SummaryLibrary";
import TaskManager from "../pages/TaskManager/TaskManager";
import UploadSummary from "../pages/UploadSummary/UploadSummary";
import React from "react";

function Router() {
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
        <Route path="/help-&-settings" element={<Help_And_Settings />} />
      </Routes>
    </>
  );
}

export default Router;

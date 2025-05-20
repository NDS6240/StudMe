import { Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";
import Home from "../pages/Home/Home";
import Help_And_Settings from "../pages/Help_And_Settings/Help_And_Settings";
import NewTask from "../pages/NewTask/NewTask";
import SummaryLibrary from "../pages/SummaryLibrary/SummaryLibrary";
import TaskManager from "../pages/TaskManager/TaskManager";
import UploadSummary from "../pages/UploadSummary/UploadSummary";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";

function Router() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task-manager" element={<TaskManager />} />
        <Route path="/new-task" element={<NewTask />} />
        <Route path="/summary-library" element={<SummaryLibrary />} />
        <Route path="/upload-summary" element={<UploadSummary />} />
        <Route path="/help-&-settings" element={<Help_And_Settings />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signUp" element={<SignUp/>}/>
      </Routes>
    </>
  );
}

export default Router;

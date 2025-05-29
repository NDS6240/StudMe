import { Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./view/components/Navbar";
import Home from "./view/pages/Home/Home";
import TaskManager from "./view/pages/TaskManager/TaskManager";
import NewTask from "./view/pages/NewTask/NewTask";
import SummaryLibrary from "./view/pages/SummaryLibrary/SummaryLibrary";
import UploadSummary from "./view/pages/UploadSummary/UploadSummary";
import Help_And_Settings from "./view/pages/Help_And_Settings/Help_And_Settings";
import Login from "./view/pages/Auth/Login";
import SignUp from "./view/pages/Auth/SignUp";
import ForumPage from "./view/pages/ForumPage/ForumPage";
import ChatRoomPage from "./view/pages/Chat/ChatRoomPage/ChatRoomPage";
import "./App.css";
const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task-manager" element={<TaskManager />} />
        <Route path="/new-task" element={<NewTask />} />
        <Route path="/summary-library" element={<SummaryLibrary />} />
        <Route path="/upload-summary" element={<UploadSummary />} />
        <Route path="/ForumPage" element={<ForumPage />} />
        <Route path="/help-&-settings" element={<Help_And_Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forum" element={<ForumPage />} />
        <Route path="/chat/:roomId" element={<ChatRoomPage />} />
      </Routes>
    </>
  );
};

export default App;

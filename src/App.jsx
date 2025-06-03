import { Routes, Route, useLocation } from "react-router-dom";
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
import PageWrapper from "./view/components/PageWrapper";
import { AnimatePresence } from "framer-motion";
import "./App.css";

const App = () => {
  // Get the route location for animations
  const location = useLocation();

  return (
    <>
      {/* Main Navigation Bar With navigate animation*/}
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
          <Route
            path="/task-manager"
            element={
              <PageWrapper>
                <TaskManager />
              </PageWrapper>
            }
          />
          <Route
            path="/new-task"
            element={
              <PageWrapper>
                <NewTask />
              </PageWrapper>
            }
          />
          <Route
            path="/summary-library"
            element={
              <PageWrapper>
                <SummaryLibrary />
              </PageWrapper>
            }
          />
          <Route
            path="/upload-summary"
            element={
              <PageWrapper>
                <UploadSummary />
              </PageWrapper>
            }
          />
          <Route
            path="/help-&-settings"
            element={
              <PageWrapper>
                <Help_And_Settings />
              </PageWrapper>
            }
          />
          <Route
            path="/login"
            element={
              <PageWrapper>
                <Login />
              </PageWrapper>
            }
          />
          <Route
            path="/signUp"
            element={
              <PageWrapper>
                <SignUp />
              </PageWrapper>
            }
          />
          {/* Navigation to from list */}
          <Route path="/ForumPage" element={<ForumPage />} />
          {/* Navigate to specific room */}
          <Route path="/chat/:roomId" element={<ChatRoomPage />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;

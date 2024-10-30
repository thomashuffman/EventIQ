import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/home/navbar";
import { Footer } from "./components/home/footer";
import { Body } from "./components/home/body";
import { ManageGroupsPage } from "./components/groups/ManageGroupsPage";
import { CreateGroupPage } from "./components/groups/CreateGroupPage";

export const App = () => {
  return (
    <Router>
      <div className="app min-h-screen flex flex-col">
        <div className="bg-black">
          <Navbar />
        </div>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/manage-groups" element={<ManageGroupsPage />} />
          <Route path="/create-group" element={<CreateGroupPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

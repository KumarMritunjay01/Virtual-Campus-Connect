import React from "react";
import { useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Notes from "./components/Notes/Notes";
import BranchNotes from "./components/Notes/BranchNotes";
import SemesterNotes from "./components/Notes/SemesterNotes.jsx";
import UploadNotes from "./components/Notes/UploadNotes.js";
import StudentMart from "./components/StudentMart/StudentMart.jsx";
import AccommodationListing from "./components/StudentMart/AccomodationListings/AccommodationListing.jsx";
import ListingDetail from "./components/StudentMart/AccomodationListings/ListingDetail.jsx";
import Marketplace from "./components/StudentMart/Buy-Sell/Marketplace.jsx";
import AddListing from "./components/StudentMart/AccomodationListings/AddListing.jsx";
import EditListing from "./components/StudentMart/AccomodationListings/EditListing.js";
import AddItemForm from "./components/StudentMart/Buy-Sell/AddItemForm.js";
import EditItem from "./components/StudentMart/Buy-Sell/EditItem.js";
import Chatroom from "./components/Chatroom/Chatroom";
import LatestNews from "./components/Home/Latest news/LatestNews";
import NoticesAndUpdates from "./components/Notices/Notices and updates board/Notices&Updates";
import AdmissionListNotices from "./components/Notices/Admission list board/AdmissionListNotices";
import AcademicStaff from "./components/College Portals/Academic staff/AcademicStaff";
import OnlineServices, {
  ExaminationForm,
  FeesPayment,
  LibraryContent,
} from "./components/College Portals/Online services/OnlineServices";
import Login from "./components/College Portals/Online services/Login";
import NEPSyllabus from "./components/College Portals/Syllabus/Syllabus.jsx";
import ELearning from "./components/College Portals/E-learning/E-Learning";
import LearningPage from "./components/College Portals/E-learning/LearningPage";
import BasicDetails from "./components/Home/Academic activities/BasicDetails";
import AcademicActivities from "./components/Home/Academic activities/Academicactivities";
import TaskActivity from "./components/Home/Academic activities/taskActivity";
import Footer from "./components/Footer/Footer";
import PageNotFound from "./components/404 error page/404Page";
import Feedback from "./components/Footer/Feedback";
import Events from "./components/Events/Events.jsx";
import YearEvents from "./components/Events/YearEvents.jsx";
import UploadEvent from "./components/Events/UploadEvent.jsx";
import EventDetails from "./components/Events/EventDetails.jsx";
import ImportantPersonHistory from "./components/Home/ImportantPersonHistory";
import Auth from "./utils/Auth.js";
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:year" element={<YearEvents />} />
          <Route path="/events/:year/upload" element={<UploadEvent />} />
          <Route path="/events/:year/:eventId" element={<EventDetails />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/:branchId" element={<BranchNotes />} />
          <Route
            path="/notes/:branchId/:semesterId"
            element={<SemesterNotes />}
          />
          <Route path="/upload" element={<UploadNotes />} />
          <Route path="/about" element={<About />} />
          <Route path="/studentmart" element={<StudentMart />} />
          <Route
            path="/studentmart/listing"
            element={<AccommodationListing />}
          />
          <Route path="/studentmart/listing/:id" element={<ListingDetail />} />
          <Route path="/studentmart/marketplace" element={<Marketplace />} />
          <Route
            path="/studentmart/marketplace/add-item"
            element={<AddItemForm />}
          />
          <Route
            path="/studentmart/marketplace/edit/:itemId"
            element={<EditItem />}
          />
          <Route path="/studentmart/add-listing" element={<AddListing />} />
          <Route path="/studentmart/edit/:id" element={<EditListing />} />
          <Route path="/chatroom" element={<Chatroom />} />
          <Route path="/latest-news/:newsName" element={<LatestNews />} />
          <Route
            path="/notices-and-updates/:notice"
            element={<NoticesAndUpdates />}
          />
          <Route
            path="/admission-list/:notice"
            element={<AdmissionListNotices />}
          />
          <Route path="/academic-staff" element={<AcademicStaff />} />
          <Route path="/online-services" element={<OnlineServices />} />
          <Route path="/e-learning" element={<ELearning />} />
          <Route path="/e-learning/:notes" element={<LearningPage />} />
          <Route path="/NEP-syllabus" element={<NEPSyllabus />} />
          <Route path="/NEP-syllabus/:courseName" element={<NEPSyllabus />} />
          <Route path="#" element={<ExaminationForm />} />
          <Route path="#" element={<FeesPayment />} />
          <Route
            path="#"
            element={
              loggedIn ? (
                <LibraryContent onLogout={handleLogout} />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route>
            <Route
              path="/founder-history"
              element={<ImportantPersonHistory />}
            />
          </Route>

          <Route path="/:detail" element={<BasicDetails />} />
          <Route path="/:detail/:activity" element={<AcademicActivities />} />
          <Route
            path="/academic-activity/:activity/task"
            element={<TaskActivity />}
          />
          <Route path="/share_your_feedback" element={<Feedback />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

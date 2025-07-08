import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import Unauthorized from "./pages/Unauthorized"; // Optional page
import ProfileEdit from "./pages/ProfileEdit";
import MentorList from "./pages/MentorList";
import MentorRequests from "./pages/MentorRequests";
import SessionBooking from "./pages/SessionBooking";
import MentorAvailability from "./pages/MentorAvailability";
import SessionsOverview from "./pages/SessionsOverview";
import FeedbackForm from "./pages/FeedbackForm";
import AdminSessions from "./pages/AdminSessions";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected route for all logged-in users */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Example: Mentor-only route */}
          <Route element={<PrivateRoute roles={["mentor"]} />}>
            <Route path="/requests" element={<div>Mentor Requests</div>} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

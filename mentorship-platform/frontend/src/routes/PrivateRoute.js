import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const PrivateRoute = ({ roles = [] }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;
  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

<Route element={<PrivateRoute />}>
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/profile/edit" element={<ProfileEdit />} />
</Route>

<Route element={<PrivateRoute roles={["mentee"]} />}>
  <Route path="/mentors" element={<MentorList />} />
</Route>

<Route element={<PrivateRoute roles={["mentee"]} />}>
  <Route path="/sessions/book" element={<SessionBooking />} />
</Route>

<Route element={<PrivateRoute roles={["mentor"]} />}>
  <Route path="/requests" element={<MentorRequests />} />
</Route>

<Route element={<PrivateRoute roles={["mentor"]} />}>
  <Route path="/availability" element={<MentorAvailability />} />
</Route>

<Route element={<PrivateRoute />}>
  <Route path="/sessions" element={<SessionsOverview />} />
</Route>

<Route element={<PrivateRoute />}>
  <Route path="/sessions/:id/feedback" element={<FeedbackForm />} />
</Route>

router.get("/sessions", auth(["admin"]), getAllSessions);

export default PrivateRoute;

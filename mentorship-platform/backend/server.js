const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const mentorRoutes = require("./routes/mentorRoutes");
const requestRoutes = require("./routes/requestRoutes");
const sessionRoutes = require("./routes/sessionRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const adminRoutes = require("./routes/adminRoutes");
app.use("/admin", adminRoutes);

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/mentors", mentorRoutes);
app.use("/requests", requestRoutes);
app.use("/sessions", sessionRoutes);
app.use("/dashboard", dashboardRoutes);

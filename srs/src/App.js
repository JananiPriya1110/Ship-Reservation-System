import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/admin/Register"; // ✅ import
import Home from "./pages/Home/Home";

// ADMIN
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ShipManager from "./pages/admin/ShipManager";
import RouteManager from "./pages/admin/RouteManager";
import ScheduleManager from "./pages/admin/ScheduleManager";
import PassengerManager from "./pages/admin/PassengerManager";

// USER
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import UserDashboard from "./pages/user/UserDashboard";
import UserProfile from "./pages/user/UserProfile";
import ViewShips from "./pages/user/ViewShips";
import ViewSchedule from "./pages/user/ViewSchedule";
import BookTicket from "./pages/user/BookTicket";
import MyBookings from "./pages/user/MyBookings";
import PaymentPage from "./pages/user/PaymentPage";
import TicketPage from "./pages/user/TicketPage";
export default function App() {
  return (
    <Router>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* ADMIN */}
        <Route path="/admin/login" element={<AdminLogin />} />
           <Route path="/admin/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/ships" element={<ShipManager />} />
        <Route path="/admin/routes" element={<RouteManager />} />
        <Route path="/admin/schedules" element={<ScheduleManager />} />
        <Route path="/admin/passengers" element={<PassengerManager />} />

        {/* USER */}
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
         <Route path="/user/view-ships" element={<ViewShips />} />
         <Route path="/user/view-schedule" element={<ViewSchedule />} />
         <Route path="/user/profile" element={<UserProfile />} />
         <Route path="/user/book" element={<BookTicket />} />
          <Route path="/user/my-bookings" element={<MyBookings />} />
          <Route path="/user/payment" element={<PaymentPage />} />
          <Route path="/user/ticket" element={<TicketPage />} />
      </Routes>
    </Router>
  );
}
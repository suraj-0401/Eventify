import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./components/Home";
import AdminRoute from "./adminRoutes/AdminRoute";

import UpdateEvent from "./events/UpdateEvent";
import EventList from "./events/EventList";
import EventDetail from "./events/EventDetail";
import MyEvent from "./events/MyEvent";
import DeleteEvent from "./events/DeleteEvent";
import CreateEvent from "./events/CreateEvent";


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/events" element={<EventList />} />
            <Route path="/events/:id" element={<EventDetail />} />
            
            {/* Admin protected routes */}
            <Route element={<AdminRoute />}>
              <Route path="/events/myevents" element={<MyEvent />} />
              <Route path="/events/create" element={<CreateEvent />} />
              <Route path="/events/update/:id" element={<UpdateEvent />} />
              <Route path="/events/delete/:id" element={<DeleteEvent />} />
              
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

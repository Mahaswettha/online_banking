// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AccountDashboard from "./components/AccountDashboard";
// import AccountDetails from "./components/AccountDetails";
// import CreateAccountForm from "./components/CreateAccountForm";
// import "./App.css";

// function App() {
//   return (
//     <Router>
//       <header className="top-nav">
//         <div className="nav-brand">BasicBank</div>
//         <nav>
//           <a href="/">Dashboard</a>
//           <a href="/create">Create</a>
//         </nav>
//       </header>

//       <main className="container">
//         <Routes>
//           <Route path="/" element={<AccountDashboard />} />
//           <Route path="/create" element={<CreateAccountForm />} />
//           <Route path="/account/:id" element={<AccountDetails />} />
//         </Routes>
//       </main>
//     </Router>
//   );
// }


// export default App;


import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, useNavigate } from "react-router-dom";
import AccountDashboard from "./components/AccountDashboard";
import AccountDetails from "./components/AccountDetails";
import CreateAccountForm from "./components/CreateAccountForm";
import LoginPage from "./components/LoginPage";
import "./App.css";

// Layout only for Admin
function AdminLayout({ onLogout }) {
  return (
    <>
      <header className="top-nav">
        <div className="nav-brand">BasicBank</div>
        <nav>
          <a href="/dashboard">Dashboard</a>
          <a href="/create">Create</a>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </nav>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}

// Layout for User (no navbar, just logout button)
function UserLayout({ onLogout }) {
  return (
    <main className="container">
      <button onClick={onLogout} className="logout-btn" style={{ margin: "10px" }}>
        Logout
      </button>
      <Outlet />
    </main>
  );
}

function App() {
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setRole(null);       // clear role
    navigate("/");       // ✅ go back to login using React Router
  };

  return (
    <Routes>
      {/* Login page — force remount when role changes */}
      <Route path="/" element={<LoginPage key={role} setRole={setRole} />} />

      {/* Admin routes with navbar */}
      {role === "admin" && (
        <Route element={<AdminLayout onLogout={handleLogout} />}>
          <Route path="/dashboard" element={<AccountDashboard />} />
          <Route path="/create" element={<CreateAccountForm />} />
        </Route>
      )}

      {/* User routes with logout button only */}
      {role === "user" && (
        <Route element={<UserLayout onLogout={handleLogout} />}>
          <Route path="/account/:id" element={<AccountDetails />} />
        </Route>
      )}
    </Routes>
  );
}

// ✅ Wrap App with Router
export default function RootApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}

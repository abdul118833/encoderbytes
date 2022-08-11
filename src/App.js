import React from "react";
import Login from "./pages/Login/Login";
import { Routes, Route, Navigate } from 'react-router-dom'
import UpdateUser from "./pages/UpdateUser/UpdateUser";
import Dashboard from "./pages/Dashboard";
function App() {
  // const RequireAuth = ({ children, redirectTo }) => {
  //   let isAuthenticated = localStorage.getItem("token")
  //   return isAuthenticated ? children : <Navigate to={redirectTo} />;
  // }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path='/dashboard/*'
          element={
            <RequireAuth redirectTo="/">
              <Dashboard />
            </RequireAuth>
          } >
        </Route> */}
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/updateUser/:id" element={<UpdateUser />} />
        <Route path="/*" element={<p>Page not found</p>} />
      </Routes>
    </div>
  );
}

export default App;





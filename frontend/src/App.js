import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./Components/Header/Header";
import LoginSignUp from "./Components/LoginSignUp/LoginSignUp";
import { useEffect } from "react";
import store from "./store";
import { loadUser } from "./Actions/userAction";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import CreateUser from "./Admin/CreateUser/CreateUser";
import AllAdminUsers from "./Admin/AllAdminUsers";
import UpdateUser from "./Admin/UpdateUser/UpdateUser";

function App() {
  const { isAuthenticated } = useSelector(state => state.user);
  useEffect(() => {
    try {
      store.dispatch(loadUser());
    } catch (error) {
    }
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/login" element={<LoginSignUp />} />
        <Route exact path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated} Component={AllAdminUsers}/>}/>
        <Route exact path="/admin/create-user" element={<ProtectedRoute isAuthenticated={isAuthenticated} Component={CreateUser}/>}/>
        <Route exact path="/admin/user/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated} Component={UpdateUser}/>}/>
      </Routes>
    </Router>
  );
}

export default App;

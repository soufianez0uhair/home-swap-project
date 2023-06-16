import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/userSlice";
import { selectAdmin } from "./redux/adminSlice";
import { useEffect, useState } from "react";

import AuthSplitScreen from "./layout/AuthSplitScreen";
import SignUpForm from './components/SignUpForm';

import SignUpImg from './assets/images/SignUp.png';
import SignInForm from "./components/SignInForm";
import Home from "./pages/Home";
import Header from "./layout/Header";
import SearchResults from "./pages/SearchResults";
import AddAccommodation from "./pages/AddAccommodation";
import AccommodationPage from "./pages/AccommodationPage";
import AdminSignIn from "./pages/AdminSignIn";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const user = useSelector(state => selectUser(state));

  const [swapSearch, setSwapSearch] = useState({
    city_id: null,
    start_date: '',
    end_date: '',
    type: ''
  });

  function handleChange(e) {
    let {name, value} = e.target;

    value = name === 'city_id' ? Number(value) : value; 

    setSwapSearch({
      ...swapSearch,
      [name]: value
    })

  }

  const admin = useSelector(state => selectAdmin(state));

  return <Router>
    <main className="App">
      <Header />
      <Routes>
        <Route path="/user/signup" element={!user ? <AuthSplitScreen img={SignUpImg} child={SignUpForm} /> : <Navigate to="/" />} />
        <Route path="/user/signin" element={!user ? <AuthSplitScreen img={SignUpImg} child={SignInForm} /> : <Navigate to="/" />} />
        <Route path="/" element={<Home swapSearch={swapSearch} handleChange={handleChange} />} />
        <Route path="/search/results/:city_id/:type_name/:start_date/:end_date" element={<SearchResults swapSearch={swapSearch} />} />
        <Route path="/accommodations/add" element={user ? <AddAccommodation /> : <Navigate to="/user/signin" />} />
        <Route path="/accommodations/:id" element={<AccommodationPage />} />
        <Route path="/admin/signin" element={!admin ? <AdminSignIn /> : <Navigate to="/admin/dashboard" />} />
        <Route path="/admin/dashboard" element={admin ? <AdminDashboard /> : <Navigate to="/admin/signin" />} />
      </Routes>
    </main>
  </Router>
}

export default App;
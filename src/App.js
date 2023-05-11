import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/userSlice";
import { useEffect, useState } from "react";

import AuthSplitScreen from "./layout/AuthSplitScreen";
import SignUpForm from './components/SignUpForm';

import SignUpImg from './assets/images/SignUp.png';
import SignInForm from "./components/SignInForm";
import Home from "./pages/Home";
import Header from "./layout/Header";
import SearchResults from "./pages/SearchResults";
import AddAccommodation from "./pages/AddAccommodation";

function App() {
  const user = useSelector(state => selectUser(state));

  const [swapSearch, setSwapSearch] = useState({
    original_city_id: null,
    targeted_city_id: null,
    startDate: '',
    endDate: '',
    type: '',
    purpose: ''
  });

  const [rentSearch, setRentSearch] = useState({
    targeted_city_id: null,
    startDate: '',
    endDate: ''
  });

  const [isSwap, setIsSwap] = useState(true);

  function handleChange(e) {
    let {name, value} = e.target;

    value = name === 'original_city_id' || name === 'targeted_city_id' ? Number(value) : value; 

    if(isSwap) {
      setSwapSearch({
        ...swapSearch,
        [name]: value
      });
    } else {
      setRentSearch({
        ...rentSearch,
        [name]: value
      });
    }
  }

  useEffect(() => {
    if(isSwap) {
      setSwapSearch({
        ...swapSearch,
        purpose: 'swap'
      })
    } else {
      setSwapSearch({
        ...swapSearch,
        purpose: 'rent'
      })
    }
  }, [isSwap]);

  return <Router>
    <main className="App">
      <Header />
      <Routes>
        <Route path="/user/signup" element={!user ? <AuthSplitScreen img={SignUpImg} child={SignUpForm} /> : <Navigate to="/" />} />
        <Route path="/user/signin" element={!user ? <AuthSplitScreen img={SignUpImg} child={SignInForm} /> : <Navigate to="/" />} />
        <Route path="/" element={<Home isSwap={isSwap} setIsSwap={setIsSwap} swapSearch={swapSearch} rentSearch={rentSearch} handleChange={handleChange} />} />
        <Route path="/search/results/:purpose/:original_city_id/:targeted_city_id/:type/:startDate/:endDate" element={<SearchResults isSwap={isSwap} swapSearch={swapSearch} rentSearch={rentSearch} />} />
        <Route path="/accommodations/add" element={user ? <AddAccommodation /> : <Navigate to="/" />} />
      </Routes>
    </main>
  </Router>
}

export default App;
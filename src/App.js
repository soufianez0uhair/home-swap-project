import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthSplitScreen from "./layout/AuthSplitScreen";
import SignUpForm from './components/SignUpForm';

import SignUpImg from './assets/images/SignUp.png';
import SignInForm from "./components/SignInForm";
import Home from "./pages/Home";
import Header from "./layout/Header";

function App() {
  return <Router>
    <main className="App">
      <Header />
      <Routes>
        <Route path="/user/signup" element={<AuthSplitScreen img={SignUpImg} child={SignUpForm} />} />
        <Route path="/user/signin" element={<AuthSplitScreen img={SignUpImg} child={SignInForm} />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </main>
  </Router>
}

export default App;
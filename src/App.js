import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthSplitScreen from "./layout/AuthSplitScreen";
import SignUpForm from './components/SignUpForm';

import SignUpImg from './assets/images/SignUp.png';
import SignInForm from "./components/SignInForm";

function App() {
  return <Router>
    <main className="App">
      <Routes>
        <Route path="/user/signup" element={<AuthSplitScreen img={SignUpImg} child={SignUpForm} />} />
        <Route path="/user/signin" element={<AuthSplitScreen img={SignUpImg} child={SignInForm} />} />
      </Routes>
    </main>
  </Router>
}

export default App;
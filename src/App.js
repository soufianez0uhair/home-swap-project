import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AuthSplitScreen from "./layout/AuthSplitScreen";
import SignUpForm from './components/SignUpForm';

import SignUpImg from './assets/images/SignUp.png';

function App() {
  return <Router>
    <main className="App">
      <Routes>
        <Route path="/user/signup" element={<AuthSplitScreen img={SignUpImg} child={SignUpForm} />} />
      </Routes>
    </main>
  </Router>
}

export default App;
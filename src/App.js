import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";

function App() {
  return <Router>
    <main className="App">
      <Routes>
        <Route path="/user/signup" element={<SignUp />} />
      </Routes>
    </main>
  </Router>
}

export default App;
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Searching from "./pages/Searching";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {


  return (
    <>
      <div className="flex flex-col min-h-screen"> {/* Flex container */}
        <Router>
          <main className="flex-grow"> {/* Main content */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Searching />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
        </Router>

        <div class="fixed bottom-2 left-2 text-sm text-black/50 font-sans select-none">
          © 2025  By Tran Quang Manh
        </div>
      </div>
    </>
  )
}

export default App

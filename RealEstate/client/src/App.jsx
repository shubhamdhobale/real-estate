import { BrowserRouter , Route , Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import About from "./Pages/About";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="profile" element={<Profile/>} />
      <Route element={<PrivateRoute/>} />
      <Route path="about" element={<About/>} />
      <Route path="signin" element={<SignIn/>} />
      <Route path="signup" element={<SignUp/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App;
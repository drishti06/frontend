import Home from "./pages/Home/Home";
import Contact from "./pages/Contact/Contact";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import {
  BrowserRouter,
  Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sounds from "./pages/Sounds/Sounds";
import Pricing from "./pages/Pricing/Pricing";
import Subscribe from "./components/Subscribe/Subscribe";
import Login from "./pages/LoginPage/LoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import SoundAudioForm from "./pages/Sounds/SoundsAuidioForm/SoundAudioForm";
import Logout from "./components/Logout/Logout";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import { useEffect } from "react";
import YourAudio from "./components/YourAudio/YourAudio";
import FAQS from "./components/FAQS/FAQS";

function App() {
  const location = useLocation();
  const excludedFooterPaths = ["/subscribe", "/sounds"];
  const shouldExcludeFooter = excludedFooterPaths.includes(location.pathname);
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  useEffect(() => {
    if (user) {
      dispatch(fetchLoggedInUserAsync)
    }
  }, [dispatch, user])
  // console.log(user)
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/sounds" element={<Sounds />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/loginPage" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/signupPage" element={<SignupPage />} />
        <Route path="/soundAudioForm" element={<SoundAudioForm />} />
        <Route path="/mySounds" element={<YourAudio />} />
        <Route path="/faqs" element={<FAQS/>} />


      </Routes>
      {!shouldExcludeFooter && <Footer />}
    </>
  );


}

function MainApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default MainApp;

import React from "react";
import "./Navbar.css";
import { LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedInUserAsync, selectUserInfo } from "../../features/user/userSlice";
import { selectLoggedInUser } from "../../features/auth/authSlice";

const Navbar = () => {
  const user = useSelector(selectLoggedInUser)
  return (
    <>
      <nav>
        <div className="nav-left">
          <div className="logo">
            <Link to="/">Logo</Link>
          </div>
          <div>
            <ul className="links">
              <li>
                <Link to="/sounds">Sounds</Link>
              </li>

              <li>
                <Link to="/pricing">Pricing</Link>
              </li>
              <li>
                <Link to="/faqs">FAQs</Link>
              </li>
            </ul>
          </div>
          <div className="search">
            <input type="text" placeholder="Search Sounds" />
            <LuSearch />
          </div>
        </div>
        <div className="nav-right">
          <div className="nav-buttons">
            {user == null ?
              <button>
                <Link to="/loginPage" style={{ color: "white" }}>
                  Login
                </Link>
              </button> :
              <button>
                <Link to='/logout' style={{ color: "white" }}>Logout</Link>
              </button>
            }
            < button > Try Free</button>
          </div>
        </div>
      </nav >
    </>
  );
};

export default Navbar;

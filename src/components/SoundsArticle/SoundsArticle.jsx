import React from "react";
import "./SoundsArticle.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../features/auth/authSlice";

const SoundsArticle = () => {
  const userHere = useSelector(selectLoggedInUser)

  return (
    <article className="article">
      <div>
        <span>
          <Link to="/soundsChart" className="article-btn">
            All Over
          </Link>
        </span>
        <br />
        <span>
          <Link to="/ibrary" className="article-btn">
            Your Library
          </Link>
        </span>
        <br />
        <span>
          <Link to="/mySounds" className="article-btn">
            Your Sounds
          </Link>
        </span>
        <br />
        {userHere != null ? <span>
          <Link to='/soundAudioForm' className="article-btn audio-btn">Add audio</Link>
        </span> : <Link to='/loginPage' className="article-btn audio-btn">Add audio</Link>}

      </div>
    </article>
  );
};

export default SoundsArticle;
